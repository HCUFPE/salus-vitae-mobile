import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { AdministracaoPage } from './administracao';

@NgModule({
  declarations: [
    AdministracaoPage,
  ],
  imports: [
    IonicPageModule.forChild(AdministracaoPage),
  ],
  providers: [
    BarcodeScanner
  ]
})
export class AdministracaoPageModule {}
