import { Component } from '@angular/core';
import {App, IonicPage} from "ionic-angular";
import {Store} from "@ngrx/store";

import {AppStore} from "../../app-store.interface";
import * as RouterActions from '../../core/router/router.action';
import {AuthGuard} from "../../core/guard/auth.guard";
import {SessionService} from "../../core/service/session.service";
import {MatDialog} from '@angular/material';
import {AppDialogAlertComponent} from '../../core/dialog/alert/alert.component';

@IonicPage({
  name: 'HomeComponent',
  segment: 'home'
})
@Component({
  selector: 'page-home-ionic',
  templateUrl: 'home.component.html'
})

export class HomeComponent extends AuthGuard {

  constructor(
    protected store: Store<AppStore>,
    protected sessionService: SessionService,
    private dialog: MatDialog,
    private app: App
  ) {
    super(store, sessionService)
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
  }

  ionViewWillLeave() {
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
      case 'notice':

        // SigninComponent
        this.app.getRootNav().getActiveChildNav().select(1);
        console.log(this.app.getRootNav().getActiveChildNav());
        break;
      case 'back':
        console.log(this.app.getRootNav().getActiveChildNav().previousTab());
        console.log(this.app.getRootNav().getActiveChildNav());
        // this.app.getRootNav().getActiveChildNav().previousTab();
        break;
    }
  }

  setLocalStorage(): void {
    const data = {
      a: 1,
      b: 2
    };
    localStorage.setItem("aram-test", JSON.stringify(data));
  }

  showDialog(): void {
    this.dialog.open(AppDialogAlertComponent, {data:{message: 'test'}});
  }
}
