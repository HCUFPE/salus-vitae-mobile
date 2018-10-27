import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { Observable } from 'rxjs';

import { LoginPage } from '../pages/login/login';
import { ConsumoStorageProvider } from '../providers/consumo-storage/consumo-storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private consumoStorage: ConsumoStorageProvider, private network: Network) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (platform.is('android')) {
        statusBar.styleBlackOpaque();
      } else {
        statusBar.styleDefault();
      }
      
      splashScreen.hide();
    });

    let isSync: boolean = false;

    Observable.interval(30000).subscribe(() => {
      if (this.isConnected() && !isSync) {
        isSync = true;

        this.consumoStorage.synchronize()
        .then(() => isSync = false)
        .catch(() => isSync = false);
      }
    });
  }

  isConnected(): boolean {
    let connType: string = this.network.type;

    return connType && connType !== 'unknown' && connType !== 'none';
  }

}

