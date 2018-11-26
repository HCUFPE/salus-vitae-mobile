import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';

import { SalusVitaeApiProvider } from '../../providers/salusvitae-api/salusvitae-api';
import { PreOperacao } from '../../models/pre-operacao.model';

@IonicPage()
@Component({
  selector: 'page-aprazamento',
  templateUrl: 'aprazamento.html',
})
export class AprazamentoPage {

  aprazamentos: PreOperacao[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, private salusVitaeApi: SalusVitaeApiProvider) {
  }

  ionViewDidEnter() {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Obtendo informações dos aprazamentos...'
    });

    loading.present();

    this.salusVitaeApi.getPreOperacoes().then((aprazamentos: PreOperacao[]) => {
      this.salusVitaeApi.getPreOperacoesWithAllDetails(aprazamentos.filter(a => a.status))
        .then((aprazamentos: PreOperacao[]) => {
          this.aprazamentos = aprazamentos.sort((a: PreOperacao, b: PreOperacao) => {
            if (new Date(a.horarioInicial) < new Date(b.horarioInicial)) return -1;
            if (new Date(a.horarioInicial) > new Date(b.horarioInicial)) return 1;
            return 0;
          });

          loading.dismiss();
        }).catch(() => this.showErrorToast(loading));
    }).catch(() => this.showErrorToast(loading));

  }

  showErrorToast(loading: Loading) {
    this.toastCtrl.create({
      message: 'Erro: Não foi possível obter os aprazamentos.',
      cssClass: 'btn-cancel',
      showCloseButton: true,
      closeButtonText: 'Fechar',
      dismissOnPageChange: true
    }).present();

    loading.dismiss();
  }

}
