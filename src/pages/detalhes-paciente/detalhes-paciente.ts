import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';

import { Prontuario } from '../../models/prontuario';
import { Prescricao } from '../../models/prescricao';
import { Alergia } from '../../models/alergia';
import { ApiProvider } from '../../providers/api/api';
import { Medicamento } from '../../models/medicamento';

@IonicPage()
@Component({
  selector: 'page-detalhes-paciente',
  templateUrl: 'detalhes-paciente.html',
})
export class DetalhesPacientePage {

  dados: string = 'prontuario';
  prontuario: Prontuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, private barcodeScanner: BarcodeScanner, private api: ApiProvider) {
    this.prontuario = this.navParams.get('prontuario');
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

  getMedicamentos() {
    return this.getUltimaPrescricao().medicamentos.sort().join(', ');
  }

  getAlergias() {
    return this.prontuario.idPaciente.alergias.map((alergia: Alergia) => alergia.descricao).sort().join(', ');
  }

  startMedicamento() {
    let barcodeConfig = {
      showTorchButton: true,
      prompt: 'Realize o scan do medicamento',
      resultDisplayDuration: 0
    };

    this.barcodeScanner.scan(barcodeConfig).then((barcodeData: BarcodeScanResult) => {
      if (!barcodeData.cancelled) {
        let loading: Loading = this.loadingCtrl.create({
          content: 'Obtendo informações do remédio...',
          dismissOnPageChange: true
        });

        loading.present();

        this.api.getMedicamento('5ba5804558104a0015c81f4f').subscribe(
          (res: Medicamento) => {
            this.navCtrl.push('DetalhesMedicamentoPage', { medicamento: res });
          }, () => {
            this.toastCtrl.create({
              message: 'Erro: Não foi possível obter o medicamento.',
              showCloseButton: true,
              closeButtonText: 'Fechar',
              dismissOnPageChange: true
            }).present();
            loading.dismiss();
          }
        );
      }
    }).catch(err => {
      this.toastCtrl.create({
        message: 'Erro: ' + err,
        showCloseButton: true,
        closeButtonText: 'Fechar',
        dismissOnPageChange: true
      }).present();
    });
  }

}
