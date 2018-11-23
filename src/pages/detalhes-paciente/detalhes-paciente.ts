import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Device } from '@ionic-native/device';

import { SalusVitaeApiProvider } from '../../providers/salusvitae-api/salusvitae-api';
import { AdministracaoStorageProvider } from '../../providers/administracao-storage/administracao-storage';
import { Prontuario } from '../../models/prontuario.model';
import { PreOperacao } from '../../models/pre-operacao.model';
import { Operacao } from '../../models/operacao.model';
import { Leito } from '../../models/leito.model';

@IonicPage()
@Component({
  selector: 'page-detalhes-paciente',
  templateUrl: 'detalhes-paciente.html',
})
export class DetalhesPacientePage {

  dados: string = 'aprazamentos';
  prontuario: Prontuario;
  aprazamentos: { aprazamento: PreOperacao, checked: boolean }[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, private salusVitaeApi: SalusVitaeApiProvider,
    private administracaoStorage: AdministracaoStorageProvider, private device: Device) {
    this.prontuario = this.navParams.get('prontuario');
    this.aprazamentos = [];
    this.navParams.get('aprazamentos').forEach(a => this.aprazamentos.push({ aprazamento: a, checked: false }));
  }

  getAprazamentosChecked() {
    return this.aprazamentos.filter(a => a.checked);
  }

  toggleSwitch(checked: any) {
    // console.log(checked);
  }

  confirm() {
    /*this.loadingCtrl.create({
      content: 'Confirmando administração...',
      dismissOnPageChange: true,
      duration: 2000
    }).present();

    if (this.prontuario && this.getAprazamentosChecked().length > 0) {
      let horario: Date = new Date();
      let consumos: Operacao[] = this.getAprazamentosChecked()
        .map<Operacao>(c => {
          return {
            cdPreOperacaoAprazamento: c.aprazamento._id, isConsumido: true, dtOperacao: horario,
            deviceUuid: this.device.uuid, deviceSerial: this.device.serial, deviceManufacturer: this.device.manufacturer,
            deviceModel: this.device.model, devicePlatform: this.device.platform, deviceVersion: this.device.version
          }
        });

      this.salusVitaeApi.postAllOperacao(consumos).then((consumos: any[]) => {
        if (consumos.every(c => c.isConsumido !== undefined)) {
          this.showToastConsumo('Medicamento administrado com sucesso!', true);
        } else {
          this.salvarConsumos(consumos);
        }
      });
    }*/
  }

  salvarConsumos(consumos: any[]) {
    /*const consumidos = consumos.filter(c => c.isConsumido !== undefined);

    this.administracaoStorage.saveAll(consumidos).then(() => {
      this.showToastConsumo('Não foi possivel enviar, as administrações foram salvas e serão enviadas automaticamente!',
        false);
    }).catch(() => {
      this.showToastConsumo('Não foi possivel enviar e salvar, tente novamente!', false);
    });*/
  }

  showToastConsumo(message: string, isSuccess: boolean) {
    this.toastCtrl.create({
      message: message,
      duration: 1000,
      cssClass: isSuccess ? 'btn-confirm' : 'btn-cancel'
    }).present();
    this.navCtrl.pop();
  }

}
