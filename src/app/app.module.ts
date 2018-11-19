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

import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { MyApp } from './app.component';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { ConsumoPageModule } from '../pages/consumo/consumo.module';
import { AprazamentoPageModule } from '../pages/aprazamento/aprazamento.module';
import { DetalhesPacientePageModule } from '../pages/detalhes-paciente/detalhes-paciente.module';
import { LoginPageModule } from '../pages/login/login.module';
import { SalusVitaeApiProvider } from '../providers/salusvitae-api/salusvitae-api';
import { HCUFPEApiProvider } from '../providers/hcufpe-api/hcufpe-api';
import { ConsumoStorageProvider } from '../providers/consumo-storage/consumo-storage';
import { UsuarioStorageProvider } from '../providers/usuario-storage/usuario-storage';

export function jwtOptionsFactory(usuarioStorageProvider) {
  return {
    tokenGetter: () => {
      return usuarioStorageProvider.getAccessToken();
    },
    whitelistedDomains: [
      '10.34.8.1:7070'
    ],
    blacklistedRoutes: [
      '10.34.8.1:7070/auth-service/ws/login'
    ]
  }
}

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
    LoginPageModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [UsuarioStorageProvider]
      }
    })
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
    UsuarioStorageProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
