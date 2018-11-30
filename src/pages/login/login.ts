import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { Usuario } from '../../models/usuario.model';
import { HCUFPEApiProvider } from '../../providers/hcufpe-api/hcufpe-api';
import { UsuarioStorageProvider } from '../../providers/usuario-storage/usuario-storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials: Usuario = { username: '', password: '' };
  isLoading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
    private hcUfpeApi: HCUFPEApiProvider, private usuarioStorage: UsuarioStorageProvider) {
  }

  login() {
    this.isLoading = true;

    this.hcUfpeApi.login(this.credentials)
      .then((usuario: Usuario) => {
        this.usuarioStorage.save(usuario)
          .then(() => {
            this.isLoading = false;

            this.navCtrl.setRoot(TabsPage);
          })
          .catch(() => {
            this.toastCtrl.create({
              message: 'Erro ao realizar o login',
              duration: 3000,
              cssClass: 'btn-cancel',
              dismissOnPageChange: true
            }).present();

            this.isLoading = false;
          });
      })
      .catch(() => {
        this.toastCtrl.create({
          message: 'Usuário e/ou senha incorreto(s)',
          duration: 3000,
          cssClass: 'btn-cancel',
          dismissOnPageChange: true
        }).present();

        this.isLoading = false;
      })
  }

}
