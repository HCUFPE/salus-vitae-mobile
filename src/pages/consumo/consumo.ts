import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ApiProvider } from '../../providers/api/api';
import { Prontuario } from '../../models/prontuario';

@IonicPage()
@Component({
  selector: 'page-consumo',
  templateUrl: 'consumo.html',
})
export class ConsumoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, private barcodeScanner: BarcodeScanner, private api: ApiProvider) {
  }

  startScanner() {
    let barcodeConfig = {
      showTorchButton: true,
      prompt: 'Realize o scan da pulseira do paciente',
      resultDisplayDuration: 0
    };

    this.barcodeScanner.scan(barcodeConfig).then(barcodeData => {
      if (!barcodeData.cancelled) {
        let loading: Loading = this.loadingCtrl.create({
          content: 'Obtendo informações do prontuário...',
          dismissOnPageChange: true
        });

        loading.present();

        this.api.getProntuario('5ba6d532882c741ea8953986').subscribe(
          (res: Prontuario) => {
            this.navCtrl.push('DetalhesPacientePage', { prontuario: res });
          }, () => {
            this.toastCtrl.create({
              message: 'Erro: Não foi possível obter o prontuário.',
              showCloseButton: true,
              closeButtonText: 'Fechar',
              dismissOnPageChange: true
            }).present();
            loading.dismiss();
          }
        );
      } else {
        this.navCtrl.setRoot('ConsumoPage');
      }
    }).catch(err => {
      this.toastCtrl.create({
        message: 'Erro: ' + err,
        showCloseButton: true,
        closeButtonText: 'Fechar',
        dismissOnPageChange: true
      }).present();
    });
  }

}
