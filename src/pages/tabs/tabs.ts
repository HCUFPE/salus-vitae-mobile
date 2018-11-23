import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  administracaoRoot = 'AdministracaoPage'
  aprazamentoRoot = 'AprazamentoPage'
  historicoRoot = 'HistoricoPage'
  constructor(public navCtrl: NavController) {}

}
