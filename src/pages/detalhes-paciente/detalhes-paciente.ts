import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Prontuario } from '../../models/prontuario';
import { Prescricao } from '../../models/prescricao';
import { ApiProvider } from '../../providers/api/api';
import { Consumo } from '../../models/consumo';
import { ConsumoStorageProvider } from '../../providers/consumo-storage/consumo-storage';
import { Resposta } from '../../models/resposta';
import { Aprazamento } from '../../models/aprazamento';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Historico } from '../../models/historico';

@IonicPage()
@Component({
  selector: 'page-detalhes-paciente',
  templateUrl: 'detalhes-paciente.html',
})
export class DetalhesPacientePage {

  dados: string = 'aprazamentos';
  prontuario: Prontuario;
  aprazamentos: { aprazamento: Aprazamento, checked: boolean }[];
  historicos: Historico[] = [];

  constructor(private deviceService: DeviceDetectorService,public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, private api: ApiProvider, private consumoStorage: ConsumoStorageProvider) {
    this.prontuario = this.navParams.get('prontuario');
    this.aprazamentos = [];
    this.getAprazamentos();
  }

  getAprazamentos(){
    this.navParams.get('aprazamentos').forEach(a => this.aprazamentos.push({ aprazamento: a, checked: false }));
    console.log(this.aprazamentos)
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

  toggleSwitch(checked:any) {
    console.log(checked);
  }

  confirm() {
    this.loadingCtrl.create({
      content: 'Confirmando administração...',
      dismissOnPageChange: true,
      duration:4000
    }).present();

    if (this.prontuario && this.getAprazamentosChecked().length > 0) {
      let horario: Date = new Date();
      let consumos: Consumo[] = [];
      let history:Historico = {mobile:this.deviceService.getDeviceInfo().device,version:this.deviceService.getDeviceInfo().os_version,
        userAgent:this.deviceService.getDeviceInfo().userAgent,dtRegistrado:horario};
      
      this.getAprazamentosChecked()
          .forEach(a => consumos.push({ prontuario: this.prontuario, aprazamento: a.aprazamento, horario: horario }));

          this.api.postConsumos(consumos).subscribe((res: Resposta) => {
        if (res.statusCode == 200) {
          this.showToastConsumo('Medicamento administrado com sucesso!', true);
        } else {
          this.salvarConsumos(consumos);
          this.getAprazamentosChecked().forEach(a=>this.historicos.push(history));
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
      duration: 1000,
      cssClass: isSuccess ? 'btn-confirm' : 'btn-cancel'
    }).present();
    window.history.forward();
    //this.navCtrl.pop();
  }

}