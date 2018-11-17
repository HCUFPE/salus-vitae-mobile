import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { Device } from '@ionic-native/device';

import { SalusVitaeApiProvider } from '../../providers/salusvitae-api/salusvitae-api';
import { Operacao } from '../../models/operacao.model';

@IonicPage()
@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html',
})
export class HistoricoPage {

  consumos: Operacao[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, private salusVitaeApi: SalusVitaeApiProvider, public device: Device) {
  }

  ionViewDidEnter() {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Obtendo informações do histórico...'
    });

    loading.present();

    this.salusVitaeApi.getHistorico("123").then((consumos: Operacao[]) => {
      this.salusVitaeApi.getOperacoesWithAllDetails(consumos)
        .then((consumos: Operacao[]) => {
          this.consumos = consumos.sort((a: Operacao, b: Operacao) => {
            if (new Date(a.dtOperacao) < new Date(b.dtOperacao)) return -1;
            if (new Date(a.dtOperacao) > new Date(b.dtOperacao)) return 1;
            return 0;
          });

          loading.dismiss();
        });
    }).catch(() => {
      this.toastCtrl.create({
        message: 'Erro: Não foi possível obter o histórico.',
        showCloseButton: true,
        closeButtonText: 'Fechar',
        dismissOnPageChange: true
      }).present();
      loading.dismiss();
    }
    );
  }

}
