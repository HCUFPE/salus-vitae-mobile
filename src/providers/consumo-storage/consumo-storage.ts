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
 
  async remove(consumo: Consumo) {
    let consumos: Consumo[] = await this.getAll();
    let index;

    if (!consumos || !consumo || !consumo.horario || !consumo.medicamento || !consumo.prontuario) {
      return Promise.reject(new Error());
    }

    index = consumos.findIndex(c => 
      new Date(c.horario).getTime() === new Date(consumo.horario).getTime() &&
      c.medicamento._id === consumo.medicamento._id && c.prontuario._id == consumo.prontuario._id);

    if (index > -1) {
      consumos.splice(index, 1);
    }
    
    return await this.storage.set(this.key, consumos);
  }
 
  async getAll() {
    return await this.storage.get(this.key);
  }

  async clear() {
    return await this.storage.clear();
  }

  async synchronize() {
    let consumos: Consumo[] = await this.getAll();

    this.toastCtrl.create({
      duration: 3000,
      message: `Sincronia iniciada: ${consumos.length}`
    }).present();

    return new Promise((resolve, reject) => {
      this.api.postConsumos(consumos).subscribe((resposta: Resposta) => {
        if (resposta && resposta.statusCode === 200) {
          this.clear().then(() => resolve(consumos));
        } else {
          reject(resposta);
        }
      }, (error) => reject(error));
    });
  }

  // async synchronize() {
  //   let consumos: Consumo[] = await this.getAll();

  //   if (consumos) {
  //     await this.toastCtrl.create({
  //       duration: 3000,
  //       message: `Sincronia iniciada: ${consumos.length}`
  //     }).present();

  //     for (let index = 0; index < consumos.length; index++) {
  //       let result: Resposta;
        
  //       if ((index + 1) % 2 === 0) {
  //         result = await this.api.postConsumo(consumos[index]);
  //       } else {
  //         result = await this.api.postConsumoOkay(consumos[index]);
  //       }

  //       if (result && result.statusCode === 200) {
  //         let remove = await this.remove(consumos[index]);
          
  //         if (remove && !(remove instanceof Error)) {
  //           await this.toastCtrl.create({
  //             duration: 2000,
  //             message: `Consumo ${index + 1} sincronizado`
  //           }).present();
  //         }
  //       }
  //     }
  //   }
  // }

}
