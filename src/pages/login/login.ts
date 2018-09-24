import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  toast: Toast;
  credentials = { name: '', password: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
  }

  login() {
    if (this.credentials.name.toLocaleLowerCase() === 'enfermeira' && this.credentials.password === '123') {
      this.navCtrl.setRoot('TabsPage');
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


}
