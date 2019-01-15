import { Component } from '@angular/core';
import {App, IonicPage} from "ionic-angular";
import {Store} from "@ngrx/store";
import {MatDialog} from '@angular/material';

import * as RouterActions from '../../core/router/router.action';

import {AppStore} from "../../app-store.interface";
import {SessionService} from "../../core/service/session.service";
import {AppDialogAlertComponent} from '../../core/dialog/alert/alert.component';
import {BasicComponent} from "../../core/basic/basic.component";

@IonicPage({
  name: 'HomeComponent',
  segment: 'home'
})
@Component({
  selector: 'page-home-ionic',
  templateUrl: 'home.component.html'
})

export class HomeComponent extends BasicComponent {

  constructor(
    protected store: Store<AppStore>,
    protected sessionService: SessionService,
    private dialog: MatDialog,
    private app: App
  ) {
    super(store, sessionService, false)
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
  }

  ionViewWillLeave() {
  }


  setLocalStorage(): void {
    const data = {
      a: 1,
      b: 2
    };
    localStorage.setItem("aram-test", JSON.stringify(data));
  }

  showDialog(): void {
    this.dialog.open(AppDialogAlertComponent, {data:{message: 'test!'}});
  }
}
