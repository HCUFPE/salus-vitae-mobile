import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { ConsumoStorageProvider } from '../../providers/consumo-storage/consumo-storage';
import { Prontuario } from '../../models/prontuario';
import { Medicamento } from '../../models/medicamento';
import { Resposta } from '../../models/resposta';
import { Consumo } from '../../models/consumo';

@IonicPage()
@Component({
  selector: 'page-detalhes-medicamento',
  templateUrl: 'detalhes-medicamento.html',
})
export class DetalhesMedicamentoPage {

  prontuario: Prontuario;
  medicamento: Medicamento;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, private api: ApiProvider, private consumoStorage: ConsumoStorageProvider) {
    this.prontuario = this.navParams.get('prontuario');
    this.medicamento = this.navParams.get('medicamento');
  }

  goHome() {
    this.navCtrl.push('TabsPage');
  }

  confirm() {
    this.loadingCtrl.create({
      content: 'Confirmando administração...',
      dismissOnPageChange: true
    }).present();

    if (this.prontuario && this.medicamento) {
      let consumo: Consumo  = { prontuario: this.prontuario, medicamento: this.medicamento, horario: new Date() };

      this.api.postConsumos([consumo]).subscribe((res: Resposta) => {
        if (res.statusCode == 200) {
          this.showToastConsumo('Medicamento administrado com sucesso!', true);
          this.navCtrl.pop();
        } else {
          this.salvarConsumo(consumo);
        }
      }, () => {
        this.salvarConsumo(consumo);
      });
    }
  }

  salvarConsumo(consumo: Consumo) {
    this.consumoStorage.save(consumo).then(() => {
      this.showToastConsumo('Não foi possivel enviar, a administração foi salva e será enviada automaticamente!',
       false);
      this.navCtrl.pop();
    }).catch(() => {
      this.showToastConsumo('Não foi possivel enviar e salvar, tente novamente!', false);
      this.navCtrl.pop();
    });
  }

  showToastConsumo(message: string, isSuccess: boolean) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      cssClass: isSuccess ? 'btn-confirm' : 'btn-cancel'
    }).present();
  }
  
}
