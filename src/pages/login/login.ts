import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast, ToastController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  toast: Toast;
  credentials = { username: '', password: '' };
  lastUsername: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
  }

  login() {
    if (this.credentials.username.toLocaleLowerCase() === 'enfermeira' && this.credentials.password === '123456') {
      this.navCtrl.setRoot(TabsPage);
    } else {
      if (this.toast !== undefined) {
        this.toast.dismiss();
      }

      this.toast = this.toastCtrl.create({
        message: 'Usuário ou/e senha incorreto(s).',
        showCloseButton: true,
        closeButtonText: 'Fechar',
        dismissOnPageChange: true
      });
      this.toast.present();
    }
  }

  onKeyUp(value: string) {
    let regExp: RegExp = /^[A-Za-z]+$/;

    if (value.length > this.lastUsername.length) {
      if (!regExp.test(value)) {
        value = value.slice(0, this.lastUsername.length - value.length);
        this.credentials.username = value;
        this.lastUsername = value;
      } else {
        this.credentials.username = value;
        this.lastUsername = value;
      }
    }
  }

}
