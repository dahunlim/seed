import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';

import * as RouterActions from './router.action';
import {App, NavController} from "ionic-angular";
import {HomeComponent} from '../../page/home/home.component';

@Injectable()
export class RouterEffect {
  @Effect({dispatch: false})
  navigate$ = this.actions$
    .ofType(RouterActions.GO)
    .do((action: RouterActions.Go) => {
      // this.app.getActiveNavs()[0].push(action.pageName, action.data);
      this.app.getRootNav().push(action.pageName, action.data);
      console.log(this.app.getRootNav().length());
    });

  @Effect({dispatch: false})
  navigateBack$ = this.actions$
    .ofType(RouterActions.BACK)
    .do(() => {

      if (this.app.getRootNav().length() > 1) {
        this.app.getActiveNavs()
          .some((nav: NavController) => {
            if(nav.canGoBack()){
              nav.pop();
              return true;
            } else {
              return false;
            }
          });
      } else {
        this.app.getRootNav().setRoot('HomeComponent');
      }
    });

  @Effect({dispatch: false})
  navigateForward$ = this.actions$
    .ofType(RouterActions.FORWARD)
    .do(() => {
      // this.app.getActiveNav().
    });
    // .do(() => this.location.forward());

  constructor(private actions$: Actions, private app: App) {
  }
}
