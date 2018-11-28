import {Store} from '@ngrx/store';
import {AppStore} from '../../app-store.interface';
import {SessionService} from '../service/session.service';
import * as RouterActions from '../../core/router/router.action';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuard {

  constructor(protected store: Store<AppStore>, protected sessionService: SessionService) {
  }

  ionViewCanEnter(): Observable<boolean> | Promise<boolean> | boolean {
    return this.sessionService
      .isAuthenticated()
      .switchMap(isAuthenticated => {
        if (!isAuthenticated) {
        } else {
          return this.sessionService
            .refresh()
            .switchMap((isRefreshed: boolean) => {
              if (!isRefreshed) {
                this.sessionService.destory();
                this.store.dispatch(new RouterActions.Go('SigninComponent'));
                return Observable.of(false);
              } else {
                return Observable.of(true);
              }
            });
          return Observable.of(true);
        }
      });
  }
}
