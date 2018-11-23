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

  async save(administracao: Operacao) {
    let administracoes: Operacao[] = await this.getAll();

    if (administracoes) {
      administracoes.push(administracao);
    } else {
      administracoes = [administracao];
    }

    return await this.storage.set(this.key, administracoes);
  }

  async saveAll(administracoes: Operacao[]) {
    let administracoesSaved: Operacao[] = await this.getAll();

    if (administracoesSaved) {
      administracoesSaved.push(...administracoes);
    } else if (administracoes) {
      administracoesSaved = administracoes;
    } else {
      administracoesSaved = [];
    }

    return await this.storage.set(this.key, administracoesSaved);
  }
 
  async getAll() {
    return await this.storage.get(this.key);
  }

  async synchronize() {
    let administracoes: Operacao[] = await this.getAll();

    if (!administracoes) {
      this.toastCtrl.create({
        duration: 3000,
        message: `Não há medicamentos administrados.`
      }).present();

      return Promise.reject('Não há medicamentos administrados.');
    }

    this.toastCtrl.create({
      duration: 3000,
      message: `Sincronia iniciada: ${administracoes.length}`
    }).present();

    /*return new Promise((resolve, reject) => {
      this.salusVitaeApi.postConsumos(administrados).subscribe(() => {
        this.clear().then(() => resolve(administrados));
      }, (error) => reject(error));
    });*/
  }

}
