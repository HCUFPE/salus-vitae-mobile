import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ConsumoPage } from '../consumo/consumo';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the DetalhesMedicamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes-medicamento',
  templateUrl: 'detalhes-medicamento.html',
})
export class DetalhesMedicamentoPage {
  dados: string = 'descricao';
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesMedicamentoPage');
  }

  private pushPage(){
    this.navCtrl.push(TabsPage);
  }

  confirm() {

    this.navCtrl.push(ConsumoPage);
    this.pushPage();
    let toast = this.toastCtrl.create({
      message: 'Medicamento consumido com sucesso!',
      duration: 3000,
      position: 'center',
      cssClass: 'btn-confirm'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
    
  }

  cancel() {

    this.navCtrl.push(ConsumoPage);
    this.pushPage();
    let toast = this.toastCtrl.create({
      message: 'Medicamento cancelado',
      duration: 3000,
      position: 'center',
      cssClass: 'btn-cancel'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    
  }

}
