import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-consumo',
  templateUrl: 'consumo.html',
})
export class ConsumoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController, private barcodeScanner: BarcodeScanner) {
  }

  startScanner() {
    let barcodeConfig = {
      showTorchButton: true,
      prompt: 'Realize o scan da pulseira do paciente',
      resultDisplayDuration: 0
    };

    this.barcodeScanner.scan(barcodeConfig).then(barcodeData => {
      if (!barcodeData.cancelled) {
        this.toastCtrl.create({
          message: barcodeData.format + ': ' + barcodeData.text,
          showCloseButton: true,
          closeButtonText: 'Fechar',
          dismissOnPageChange: true
        }).present();
      } else {
        this.navCtrl.setRoot('ConsumoPage').then(() => {
          this.toastCtrl.create({
            message: 'Cancelled',
            showCloseButton: true,
            closeButtonText: 'Fechar',
            dismissOnPageChange: true
          }).present();
        });
      }
    }).catch(err => {
      this.toastCtrl.create({
        message: 'Error: ' + err,
        showCloseButton: true,
        closeButtonText: 'Fechar',
        dismissOnPageChange: true
      }).present();
    });
  }

}
