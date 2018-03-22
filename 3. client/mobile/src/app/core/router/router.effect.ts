import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';

import * as RouterActions from './router.action';
import {App} from "ionic-angular";

@Injectable()
export class RouterEffect {
  @Effect({dispatch: false})
  navigate$ = this.actions$
    .ofType(RouterActions.GO)
    .do((action: RouterActions.Go) => {
      this.app.getRootNav().push(action.pageName, action.data);
    });

  @Effect({dispatch: false})
  navigateBack$ = this.actions$
    .ofType(RouterActions.BACK)
    .do(() => {
      if (this.app.getActiveNavs()[0].canGoBack()){
        this.app.getActiveNavs()[0].pop();
      } else {
        // this.navCtrl.setRoot(HomeComponent); // Root Module Set
        // this.app.getActiveNavs()[0].push(this.app.getRootNav().root, {});
        this.app.getActiveNavs()[0].push('HomeComponent', {});
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
