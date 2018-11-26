import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ModalController, Modal } from 'ionic-angular';
import { Device } from '@ionic-native/device';

import { DetalhesAdministracaoPage } from '../detalhes-administracao/detalhes-administracao';
import { Prontuario } from '../../models/prontuario.model';
import { PreOperacao } from '../../models/pre-operacao.model';
import { Operacao } from '../../models/operacao.model';
import { UsuarioStorageProvider } from '../../providers/usuario-storage/usuario-storage';

@IonicPage()
@Component({
  selector: 'page-detalhes-paciente',
  templateUrl: 'detalhes-paciente.html',
})
export class DetalhesPacientePage {

  dados: string = 'aprazamentos';
  prontuario: Prontuario;
  aprazamentos: { aprazamento: PreOperacao, checked: boolean }[];
  isModalRunning: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, public modalCtrl: ModalController, private device: Device,
    private usuarioStorage: UsuarioStorageProvider) {
    this.aprazamentos = [];
    this.prontuario = this.navParams.get('prontuario');
    this.navParams.get('aprazamentos').forEach(a => this.aprazamentos.push({ aprazamento: a, checked: false }));
  }

  getAprazamentosChecked() {
    return this.aprazamentos.filter(a => a.checked);
  }

  getOperacoes(): Promise<Operacao[]> {
    return new Promise((resolve, reject) => {
      this.usuarioStorage.getUsername()
        .then((username: string) => {
          const horario: Date = new Date();

          resolve(this.getAprazamentosChecked()
            .map<Operacao>(a => {
              return {
                cdPreOperacaoAprazamento: a.aprazamento._id, isConsumido: true, dtOperacao: horario,
                deviceUuid: this.device.uuid, deviceSerial: this.device.serial,
                deviceManufacturer: this.device.manufacturer, deviceModel: this.device.model,
                devicePlatform: this.device.platform, deviceVersion: this.device.version,
                nmUsuario: username, aprazamento: a.aprazamento
              }
            }));
        }).catch((err) => reject(err));
    });
  }

  confirm() {
    this.getOperacoes()
      .then((operacoes: Operacao[]) => {
        const modal: Modal = this.modalCtrl.create(
          DetalhesAdministracaoPage,
          { administracoes: operacoes },
          { enableBackdropDismiss: false }
        );
        this.isModalRunning = true;
        
        modal.present();
        modal.onDidDismiss(() => this.navCtrl.pop());
      });
  }

}
