import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
import { Push } from '@ionic-native/push';

import { MyApp } from './app.component';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { ConsumoPageModule } from '../pages/consumo/consumo.module';
import { AprazamentoPageModule } from '../pages/aprazamento/aprazamento.module';
import { DetalhesPacientePageModule } from '../pages/detalhes-paciente/detalhes-paciente.module';
import { LoginPageModule } from '../pages/login/login.module';
import { SalusVitaeApiProvider } from '../providers/salusvitae-api/salusvitae-api';
import { HCUFPEApiProvider } from '../providers/hcufpe-api/hcufpe-api';
import { ConsumoStorageProvider } from '../providers/consumo-storage/consumo-storage';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TabsPageModule,
    ConsumoPageModule,
    AprazamentoPageModule,
    DetalhesPacientePageModule,
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Device,
    Network,
    Push,
    SalusVitaeApiProvider,
    HCUFPEApiProvider,
    ConsumoStorageProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
