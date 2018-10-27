import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { Prontuario } from '../../models/prontuario';
import { Prescricao } from '../../models/prescricao';
import { ApiProvider } from '../../providers/api/api';
import { Consumo } from '../../models/consumo';
import { ConsumoStorageProvider } from '../../providers/consumo-storage/consumo-storage';
import { Resposta } from '../../models/resposta';
import { Aprazamento } from '../../models/aprazamento';

@IonicPage()
@Component({
  selector: 'page-detalhes-paciente',
  templateUrl: 'detalhes-paciente.html',
})
export class DetalhesPacientePage {

  dados: string = 'aprazamentos';
  prontuario: Prontuario;
  aprazamentos: { aprazamento: Aprazamento, checked: boolean }[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, private api: ApiProvider, private consumoStorage: ConsumoStorageProvider) {
    this.prontuario = this.navParams.get('prontuario');
    this.aprazamentos = [];
    this.navParams.get('aprazamentos').forEach(a => this.aprazamentos.push({ aprazamento: a, checked: false }));
  }

  getUltimaPrescricao() {
    if (this.prontuario.prescricoes.length == 0) {
      return null;
    }

    return this.prontuario.prescricoes.sort((a: Prescricao, b: Prescricao) => {
      if (a.dataPrescricao > b.dataPrescricao) return -1;
      if (a.dataPrescricao < b.dataPrescricao) return 1;
      return 0;
    })[0];
  }

  getAprazamentosChecked() {
    return this.aprazamentos.filter(a => a.checked);
  }

  confirm() {
    this.loadingCtrl.create({
      content: 'Confirmando administração...',
      dismissOnPageChange: true
    }).present();

    if (this.prontuario && this.getAprazamentosChecked().length > 0) {
      let horario: Date = new Date();
      let consumos: Consumo[] = [];
      this.getAprazamentosChecked()
          .forEach(a => consumos.push({ prontuario: this.prontuario, aprazamento: a.aprazamento, horario: horario }));
      
      this.api.postConsumos(consumos).subscribe((res: Resposta) => {
        if (res.statusCode == 200) {
          this.showToastConsumo('Medicamento administrado com sucesso!', true);
        } else {
          this.salvarConsumos(consumos);
        }
      }, () => {
        this.salvarConsumos(consumos);
      });
    }
  }

  salvarConsumos(consumos: Consumo[]) {
    this.consumoStorage.saveAll(consumos).then(() => {
      this.showToastConsumo('Não foi possivel enviar, as administrações foram salvas e serão enviadas automaticamente!',
       false);
    }).catch(() => {
      this.showToastConsumo('Não foi possivel enviar e salvar, tente novamente!', false);
    });
  }

  showToastConsumo(message: string, isSuccess: boolean) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      cssClass: isSuccess ? 'btn-confirm' : 'btn-cancel'
    }).present();
    this.navCtrl.pop();
  }

}
