import { Component } from '@angular/core';
import { Platform, ViewController } from 'ionic-angular';

import { Operacao } from '../../models/operacao.model';
import { SalusVitaeApiProvider } from '../../providers/salusvitae-api/salusvitae-api';
import { AdministracaoStorageProvider } from '../../providers/administracao-storage/administracao-storage';

@Component({
  selector: 'page-detalhes-administracao',
  templateUrl: 'detalhes-administracao.html',
})
export class DetalhesAdministracaoPage {

  private backButtonUnregister: any;
  results: { operacao: Operacao, isLoading: boolean, isSuccess: boolean }[];

  constructor(public viewCtrl: ViewController, public platform: Platform,
    private salusVitaeApi: SalusVitaeApiProvider, private administracaoStorage: AdministracaoStorageProvider) {
    this.backButtonUnregister = platform.registerBackButtonAction(() => { });
    this.results = [];
    this.viewCtrl.getNavParams().get('administracoes')
      .forEach(o => this.results.push({ operacao: o, isLoading: true, isSuccess: false }));
  }

  ionViewDidLoad() {
    this.salusVitaeApi.postOperacoes(this.results.map(r => r.operacao))
      .then((results: any[]) => {
        for (let index = 0; index < results.length; index++) {
          if (results[index]._id !== undefined) {
            this.results[index].isSuccess = true;
          } else {
            this.administracaoStorage.save(this.results[index].operacao);
          }

          this.results[index].isLoading = false
        }
      })
      .catch(() => this.results.forEach(r => {
        r.isSuccess = false;
        r.isLoading = false;
      }));
  }

  ionViewWillLeave() {
    this.backButtonUnregister();
  }

  canCloseModal() {
    return this.results.every(r => !r.isLoading);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
