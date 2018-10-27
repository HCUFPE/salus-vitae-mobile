import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

import { Consumo } from '../../models/consumo';
import { Resposta } from '../../models/resposta';
import { ApiProvider } from '../api/api';

@Injectable()
export class ConsumoStorageProvider {

  private key: string = 'consumo';

  constructor(private storage: Storage, private api: ApiProvider, private toastCtrl: ToastController) {
  }

  async save(consumo: Consumo) {
    let consumos: Consumo[] = await this.getAll();

    if (consumos) {
      consumos.push(consumo);
    } else {
      consumos = [consumo];
    }

    return await this.storage.set(this.key, consumos);
  }

  async saveAll(consumos: Consumo[]) {
    let consumosSaved: Consumo[] = await this.getAll();

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
    let administrados: Consumo[] = await this.getAll();

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

    return new Promise((resolve, reject) => {
      this.api.postConsumos(administrados).subscribe((resposta: Resposta) => {
        if (resposta && resposta.statusCode === 200) {
          this.clear().then(() => resolve(administrados));
        } else {
          reject(resposta);
        }
      }, (error) => reject(error));
    });
  }

}
