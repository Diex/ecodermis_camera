import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { NavigationBar } from '@ionic-native/navigation-bar/ngx';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private navigationBar: NavigationBar,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
  
    const autoHide = true;
    this.navigationBar.setUp(autoHide);

    console.log('initilizeApp()');

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.hide();
      this.splashScreen.hide();
    });
  }
}
