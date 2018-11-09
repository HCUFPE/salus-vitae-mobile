import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { Device } from '@ionic-native/device';

import { ApiProvider } from '../../providers/api/api';
import { Consumo } from '../../models/consumo';

@IonicPage()
@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html',
})
export class HistoricoPage {

  consumos: Consumo[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, private api: ApiProvider, public device: Device) {
  }

  ionViewDidEnter() {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Obtendo informações do histórico...'
    });

    loading.present();

    this.api.getHistorico(this.device.uuid).subscribe(
      (res: Consumo[]) => {
        this.consumos = res.sort((a: Consumo, b: Consumo) => {
          if (new Date(a.horario) < new Date(b.horario)) return -1;
          if (new Date(a.horario) > new Date(b.horario)) return 1;
          return 0;
        });

        loading.dismiss();
      },
      () => {
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
