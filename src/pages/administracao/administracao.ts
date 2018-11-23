import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController, Loading, Platform } from 'ionic-angular';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';

import { SalusVitaeApiProvider } from '../../providers/salusvitae-api/salusvitae-api';
import { HCUFPEApiProvider } from '../../providers/hcufpe-api/hcufpe-api';
import { Prontuario } from '../../models/prontuario.model';
import { PreOperacao } from '../../models/pre-operacao.model';
import { DetalhesPacientePage } from '../detalhes-paciente/detalhes-paciente';

@IonicPage()
@Component({
  selector: 'page-administracao',
  templateUrl: 'administracao.html',
})
export class AdministracaoPage {

  constructor(public platform: Platform, public navCtrl: NavController, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, private barcodeScanner: BarcodeScanner,
    private salusVitaeApi: SalusVitaeApiProvider, private hcUfpeApi: HCUFPEApiProvider) {
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
          content: 'Obtendo o prontuário...',
          dismissOnPageChange: true
        });

        loading.present();

        this.hcUfpeApi.getProntuario(19569516).then((prontuario: Prontuario) => {
          //(+barcodeData.text).then((prontuario: Prontuario) => {
          loading.setContent('Obtendo o leito...');

          this.hcUfpeApi.getProntuarioWithAllDetails(prontuario).then((prontuario: Prontuario) => {
            loading.setContent('Obtendo os aprazamentos...');

            this.salusVitaeApi.getPreOperacoesByProntuario(prontuario.prontuario, prontuario.leito.atendimento)
              .then((aprazamentos: PreOperacao[]) => {
                this.salusVitaeApi.getPreOperacoesWithAllDetails(aprazamentos)
                  .then((aprazamentos: PreOperacao[]) => {
                    aprazamentos = aprazamentos.sort((a: PreOperacao, b: PreOperacao) => {
                      if (new Date(a.horarioInicial) < new Date(b.horarioInicial)) return -1;
                      if (new Date(a.horarioInicial) > new Date(b.horarioInicial)) return 1;
                      return 0;
                    });

                    this.navCtrl.push(DetalhesPacientePage, { prontuario: prontuario, aprazamentos: aprazamentos });
                  }).catch(() => {
                    this.toastCtrl.create({
                      message: 'Erro: Não foi possível obter os aprazamentos.',
                      showCloseButton: true,
                      closeButtonText: 'Fechar',
                      dismissOnPageChange: true
                    }).present();

                    loading.dismiss();
                  });
              }).catch(() => {
                this.toastCtrl.create({
                  message: 'Erro: Não foi possível obter os aprazamentos.',
                  showCloseButton: true,
                  closeButtonText: 'Fechar',
                  dismissOnPageChange: true
                }).present();

                loading.dismiss();
              })
          }).catch(() => {
            this.toastCtrl.create({
              message: 'Erro: Não foi possível obter o leito.',
              showCloseButton: true,
              closeButtonText: 'Fechar',
              dismissOnPageChange: true
            }).present();

            loading.dismiss();
          });
        }).catch(() => {
          this.toastCtrl.create({
            message: 'Erro: Não foi possível obter o prontuário.',
            showCloseButton: true,
            closeButtonText: 'Fechar',
            dismissOnPageChange: true
          }).present();

          loading.dismiss();
        });
      } else {
        this.navCtrl.setRoot(AdministracaoPage);
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
