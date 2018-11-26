import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { UsuarioStorageProvider } from '../../providers/usuario-storage/usuario-storage';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  administracaoRoot = 'AdministracaoPage'
  aprazamentoRoot = 'AprazamentoPage'
  historicoRoot = 'HistoricoPage'

  constructor(public navCtrl: NavController, private usuarioStorage: UsuarioStorageProvider) {
  }

  logout() {
    this.usuarioStorage.clear().then(() => this.navCtrl.setRoot(LoginPage));
  }

}
