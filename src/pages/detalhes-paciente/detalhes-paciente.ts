import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { Prontuario } from '../../models/prontuario';
import { Prescricao } from '../../models/prescricao';
import { Alergia } from '../../models/alergia';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-detalhes-paciente',
  templateUrl: 'detalhes-paciente.html',
})
export class DetalhesPacientePage {

  dados: string = 'prontuario';
  prontuario: Prontuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, private barcodeScanner: BarcodeScanner) {
    this.prontuario = this.navParams.get('prontuario');
  }

  getUltimaPrescricao() {
    if (this.prontuario.prescricoes.length == 0) {
      return null;
    }

    return this.prontuario.prescricoes.sort((a: Prescricao, b: Prescricao) => {
      if (a.dataPrescricao > b.dataPrescricao)return -1;
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

    this.barcodeScanner.scan(barcodeConfig).then(barcodeData => {
      if (!barcodeData.cancelled) {
        let loading = this.loadingCtrl.create({
          content: 'Obtendo informações do remédio...',
          duration: 3000
        });

        loading.present();

        loading.onDidDismiss(() => {
          this.navCtrl.push('DetalhesMedicamentoPage');
        })
      } else {
        this.navCtrl.setRoot('PacientePage');
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
