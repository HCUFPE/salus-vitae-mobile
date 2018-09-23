import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detalhes-paciente',
  templateUrl: 'detalhes-paciente.html',
})
export class DetalhesPacientePage {

  dados: string = 'prontuario';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
