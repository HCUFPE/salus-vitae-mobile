import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Prontuario } from '../../models/prontuario';
import { Prescricao } from '../../models/prescricao';
import { Alergia } from '../../models/alergia';

@IonicPage()
@Component({
  selector: 'page-detalhes-paciente',
  templateUrl: 'detalhes-paciente.html',
})
export class DetalhesPacientePage {

  dados: string = 'prontuario';
  prontuario: Prontuario;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

}
