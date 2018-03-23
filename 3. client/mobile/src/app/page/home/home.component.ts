import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";
import {Store} from "@ngrx/store";

import {AppStore} from "../../app-store.interface";
import * as RouterActions from '../../core/router/router.action';
import {AuthGuard} from "../../core/guard/auth.guard";
import {SessionService} from "../../core/service/session.service";

@IonicPage({
  name: 'HomeComponent',
  segment: 'home'
})
@Component({
  selector: 'page-home-ionic',
  templateUrl: 'home.component.html'
})

export class HomeComponent extends AuthGuard{

  constructor(protected store: Store<AppStore>, protected sessionService: SessionService) {
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
    }
  }
}
