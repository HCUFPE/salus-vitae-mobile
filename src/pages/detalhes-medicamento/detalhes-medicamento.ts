import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Medicamento } from '../../models/medicamento';

@IonicPage()
@Component({
  selector: 'page-detalhes-medicamento',
  templateUrl: 'detalhes-medicamento.html',
})
export class DetalhesMedicamentoPage {

  medicamento: Medicamento;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.medicamento = this.navParams.get('medicamento');
  }

  goHome() {
    this.navCtrl.push('TabsPage');
  }

  confirm() {
    this.goHome();

    let toast = this.toastCtrl.create({
      message: 'Medicamento consumido com sucesso!',
      duration: 3000,
      cssClass: 'btn-confirm'
    });

    toast.present();
  }

}
