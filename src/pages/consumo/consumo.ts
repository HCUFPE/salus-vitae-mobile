import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-consumo',
  templateUrl: 'consumo.html',
})
export class ConsumoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, private barcodeScanner: BarcodeScanner) {
  }

  startScanner() {
    let barcodeConfig = {
      showTorchButton: true,
      prompt: 'Realize o scan da pulseira do paciente',
      resultDisplayDuration: 0
    };

    this.barcodeScanner.scan(barcodeConfig).then(barcodeData => {
      if (!barcodeData.cancelled) {
        let loading = this.loadingCtrl.create({
          content: 'Obtendo informações do prontuário...',
          duration: 3000
        });

        loading.present();

        loading.onDidDismiss(() => {
          this.navCtrl.push('DetalhesPacientePage');
        })
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
