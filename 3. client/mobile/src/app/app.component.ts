import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as RouterActions from "./core/router/router.action";
import {Store} from "@ngrx/store";
import {AppStore} from "./app-store.interface";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = 'TabsComponent';
  rootPage:any = 'HomeComponent';

  constructor(private store: Store<AppStore>, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();
    });
  }

  goToPage(page: string) {
    switch (page) {
      case 'home':
        this.store.dispatch(new RouterActions.Go('HomeComponent'));
        break;
      case 'tabs':
        this.store.dispatch(new RouterActions.Go('TabsComponent'));
        break;
      case 'signin':
        this.store.dispatch(new RouterActions.Go('SigninComponent'));
        break;
      case 'signup':
        this.store.dispatch(new RouterActions.Go('SignupComponent'));
        break;
    }
  }

  back() {
    this.store.dispatch(new RouterActions.Back());
  }
}

