import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  consumoRoot = 'ConsumoPage'
  aprazamentoRoot = 'AprazamentoPage'
  constructor(public navCtrl: NavController) {}

}
