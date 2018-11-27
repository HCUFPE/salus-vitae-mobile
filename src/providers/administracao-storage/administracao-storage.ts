import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

import { SalusVitaeApiProvider } from '../salusvitae-api/salusvitae-api';
import { Operacao } from '../../models/operacao.model';

@Injectable()
export class AdministracaoStorageProvider {

  private key: string = 'administracao';

  constructor(private storage: Storage, private salusVitaeApi: SalusVitaeApiProvider,
    private toastCtrl: ToastController) {
  }

  async save(administracao: Operacao): Promise<any> {
    let administracoes: Operacao[] = await this.getAll();
    administracao = Object.assign({}, administracao);
    administracao.aprazamento = undefined;

    if (administracoes) {
      if (!administracoes.map(a => a.cdPreOperacaoAprazamento).includes(administracao.cdPreOperacaoAprazamento)) {
        administracoes.push(administracao);
      }
    } else {
      administracoes = [administracao];
    }

    return await this.storage.set(this.key, administracoes);
  }


  async getAll(): Promise<Operacao[]> {
    return await this.storage.get(this.key);
  }

  async remove(administracao: Operacao): Promise<any> {
    let administracoes: Operacao[] = await this.getAll();

    if (administracoes) {
      administracoes.splice(administracoes.findIndex(a => a.cdPreOperacaoAprazamento === administracao.cdPreOperacaoAprazamento), 1);
    }

    return await this.storage.set(this.key, administracoes);
  }

  async synchronize(): Promise<any> {
    let administracoes: Operacao[] = await this.getAll();

    if (!administracoes || administracoes.length === 0) {
      /*this.toastCtrl.create({
        duration: 3000,
        message: `Não há medicamentos administrados.`
      }).present();*/

      return Promise.reject('Não há medicamentos administrados.');
    }

    /*this.toastCtrl.create({
      duration: 3000,
      message: `Sincronia iniciada: ${administracoes.length}`
    }).present();*/

    let results: any[] = await this.salusVitaeApi.postOperacoes(administracoes);

    for (const result of results) {
      if (result._id !== undefined) {
        await this.remove(result);
      }
    }

    return results;
  }

}
