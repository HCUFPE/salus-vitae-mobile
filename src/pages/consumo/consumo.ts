import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController, Loading, Platform } from 'ionic-angular';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';

import { ApiProvider } from '../../providers/api/api';
import { Prontuario } from '../../models/prontuario';
import { Aprazamento } from '../../models/aprazamento';
import { DetalhesPacientePage } from '../detalhes-paciente/detalhes-paciente';

@IonicPage()
@Component({
  selector: 'page-consumo',
  templateUrl: 'consumo.html',
})
export class ConsumoPage {

  constructor(public platform:Platform,public navCtrl: NavController, public toastCtrl: ToastController, public loadingCtrl: LoadingController,
    private barcodeScanner: BarcodeScanner, private api: ApiProvider) {
  }

  startScanner() {
    let barcodeConfig = {
      showTorchButton: true,
      prompt: 'Realize o scan da pulseira do paciente',
      resultDisplayDuration: 0
    };

    this.barcodeScanner.scan(barcodeConfig).then((barcodeData: BarcodeScanResult) => {
      if (!barcodeData.cancelled) {
        let loading: Loading = this.loadingCtrl.create({
          content: 'Obtendo informações do prontuário...',
          dismissOnPageChange: true
        });

        loading.present();

        this.api.getProntuario('5ba6d532882c741ea8953986').subscribe(
          (resProntuario: Prontuario) => {
            loading.setContent('Obtendo informações dos aprazamentos...');

            this.api.getAprazamentos().subscribe(
              (resAprazamentos: Aprazamento[]) => {
                resAprazamentos = resAprazamentos.sort((a: Aprazamento, b: Aprazamento) => {
                  if (new Date(a.horario) < new Date(b.horario)) return -1;
                  if (new Date(a.horario) > new Date(b.horario)) return 1;
                  return 0;
                });

                this.navCtrl.push(DetalhesPacientePage, { prontuario: resProntuario, aprazamentos: resAprazamentos });
              }, () => {
                this.toastCtrl.create({
                  message: 'Erro: Não foi possível obter os aprazamentos.',
                  showCloseButton: true,
                  closeButtonText: 'Fechar',
                  dismissOnPageChange: true
                }).present();

                loading.dismiss();
              }
            );
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
