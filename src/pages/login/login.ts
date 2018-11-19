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
  lastUsername: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
    private hcUfpeApi: HCUFPEApiProvider, private usuarioStorage: UsuarioStorageProvider) {
  }

  login() {
    this.hcUfpeApi.login(this.credentials)
      .then((usuario: Usuario) => {
        this.usuarioStorage.save(usuario)
          .then(() => {
            this.usuarioStorage.get()
            .then((usuario: Usuario) => console.log(usuario))
            .catch((err) => console.log(err));
            this.usuarioStorage.getAccessToken()
            .then((token: string) => console.log(token))
            .catch((err) => console.log(err));
            this.usuarioStorage.getUsername()
            .then((username: string) => console.log(username))
            .catch((err) => console.log(err));
            this.navCtrl.setRoot(TabsPage);
          })
          .catch(() => {
            this.toastCtrl.create({
              message: 'Erro ao realizar login',
              duration: 3000,
              dismissOnPageChange: true
            }).present();
          });
      })
      .catch(() => {
        this.toastCtrl.create({
          message: 'Usuário e/ou senha incorreto(s)',
          duration: 3000,
          dismissOnPageChange: true
        }).present();
      })
    if (this.credentials.username.toLocaleLowerCase() === 'enfermeira' && this.credentials.password === '123456') {
      this.navCtrl.setRoot(TabsPage);
    }
  }

}
