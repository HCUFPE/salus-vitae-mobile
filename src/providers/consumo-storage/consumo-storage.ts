import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

import { SalusVitaeApiProvider } from '../salusvitae-api/salusvitae-api';
import { Operacao } from '../../models/operacao.model';

@Injectable()
export class ConsumoStorageProvider {

  private key: string = 'consumo';

  constructor(private storage: Storage, private salusVitaeApi: SalusVitaeApiProvider,
    private toastCtrl: ToastController) {
  }

  async save(consumo: Operacao) {
    let consumos: Operacao[] = await this.getAll();

    if (consumos) {
      consumos.push(consumo);
    } else {
      consumos = [consumo];
    }

    return await this.storage.set(this.key, consumos);
  }

  async saveAll(consumos: Operacao[]) {
    let consumosSaved: Operacao[] = await this.getAll();

    if (consumosSaved) {
      consumosSaved.push(...consumos);
    } else if (consumos) {
      consumosSaved = consumos;
    } else {
      consumosSaved = [];
    }

    return await this.storage.set(this.key, consumosSaved);
  }
 
  async getAll() {
    return await this.storage.get(this.key);
  }

  async clear() {
    return await this.storage.clear();
  }

  async synchronize() {
    let administrados: Operacao[] = await this.getAll();

    if (!administrados) {
      this.toastCtrl.create({
        duration: 3000,
        message: `Não há medicamentos administrados.`
      }).present();

      return Promise.reject('Não há medicamentos administrados.');
    }

    this.toastCtrl.create({
      duration: 3000,
      message: `Sincronia iniciada: ${administrados.length}`
    }).present();

    /*return new Promise((resolve, reject) => {
      this.salusVitaeApi.postConsumos(administrados).subscribe(() => {
        this.clear().then(() => resolve(administrados));
      }, (error) => reject(error));
    });*/
  }

}
