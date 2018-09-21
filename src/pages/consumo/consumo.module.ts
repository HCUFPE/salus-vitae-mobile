import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ConsumoPage } from './consumo';

@NgModule({
  declarations: [
    ConsumoPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsumoPage),
  ],
  providers: [
    BarcodeScanner
  ]
})
export class ConsumoPageModule {}
