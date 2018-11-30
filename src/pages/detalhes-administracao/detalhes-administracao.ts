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
      .then((results: any[]) => this.salvarOperacoes(results))
      .catch(() => this.salvarOperacoes(this.results.map(r => r.operacao)));
  }

  ionViewWillLeave() {
    this.backButtonUnregister();
  }

  async salvarOperacoes(results: any[]) {
    for (let index = 0; index < results.length; index++) {
      if (results[index]._id !== undefined) {
        this.cancelLoading(this.results[index], true);
      } else {
        if (results[index].cdPreOperacaoAprazamento && results[index].isConsumido && results[index].dtOperacao && results[index].deviceUuid &&
          results[index].deviceSerial && results[index].deviceManufacturer && results[index].deviceModel && results[index].devicePlatform &&
          results[index].deviceVersion && results[index].nmUsuario) {
          await this.administracaoStorage.save(results[index]);
        }
        
        this.cancelLoading(this.results[index], false);
      }
    }

    this.closeModal();
  }

  cancelLoading(result: { operacao: Operacao, isLoading: boolean, isSuccess: boolean }, isSuccess: boolean) {
    result.isSuccess = isSuccess;
    result.isLoading = false;
  }

  canCloseModal() {
    return this.results.every(r => !r || !r.isLoading);
  }

  closeModal() {
    this.viewCtrl.dismiss(this.results);
  }

}
