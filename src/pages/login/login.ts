import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast, ToastController } from 'ionic-angular';
import { ConsumoPage } from '../consumo/consumo';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
      this.navCtrl.setRoot(ConsumoPage);
      this.navCtrl.push(TabsPage);
    } else {
      if (this.toast !== undefined) {
        this.toast.dismiss();
      }
      
      this.toast = this.toastCtrl.create({
        message: 'Usuário ou/e senha incorreto(s).',
        showCloseButton: true,
        closeButtonText: 'Fechar',
        dismissOnPageChange: true,
        cssClass: 'btn-cancel'
      });

      this.toast.present();
    }

  }


}
