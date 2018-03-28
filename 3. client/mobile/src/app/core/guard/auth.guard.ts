import {Store} from '@ngrx/store';

import {AppStore} from '../../app-store.interface';
import {SessionService} from '../service/session.service';
import * as RouterActions from '../../core/router/router.action';
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard {

  constructor(protected store: Store<AppStore>, protected sessionService: SessionService) {
  }


  ionViewCanEnter(): Observable<boolean> | Promise<boolean> | boolean {
    console.log('AuthGuard');
    return this.sessionService
      .isAuthenticated()
      .switchMap(isAuthenticated => {
        console.log(isAuthenticated);
        if (!isAuthenticated) {
          return this.sessionService
            .refresh()
            .switchMap((isRefreshed: boolean) => {
              console.log(isRefreshed);
              if (!isRefreshed) {
                this.store.dispatch(new RouterActions.Go('SigninComponent'));
                return Observable.of(false);
              }else {
                return Observable.of(true);
              }
            });
        } else {
          return Observable.of(true);
        }
      });
  }
}
