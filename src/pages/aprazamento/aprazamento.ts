import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { Aprazamento } from './../../models/aprazamento';

@IonicPage()
@Component({
  selector: 'page-aprazamento',
  templateUrl: 'aprazamento.html',
})
export class AprazamentoPage {

  aprazamentos: Aprazamento[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, private api: ApiProvider) {
  }

  ionViewDidEnter() {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Obtendo informações dos aprazamentos...'
    });
    
    loading.present();

    this.api.getAprazamentos().subscribe(
        (res: Aprazamento[]) => {
          this.aprazamentos = res;
          loading.dismiss();
        },
        () => {
          this.toastCtrl.create({
            message: 'Erro: Não foi possível obter os aprazamentos.',
            showCloseButton: true,
            closeButtonText: 'Fechar',
            dismissOnPageChange: true
          }).present();
          loading.dismiss();
        }
    );
  }

}
