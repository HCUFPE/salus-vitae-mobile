import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DetalhesAdministracaoPage } from './detalhes-administracao';

@NgModule({
  declarations: [
    DetalhesAdministracaoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesAdministracaoPage),
  ],
})
export class DetalhesAdministracaoPageModule {}
