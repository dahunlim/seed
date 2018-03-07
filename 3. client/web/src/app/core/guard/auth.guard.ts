import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AppStore} from '../../app-store.interface';
import {Store} from '@ngrx/store';
import {SessionService} from "../service/session.service";
import {MatDialog} from "@angular/material";

import * as RouterActions from '../../core/router/router.action';
import {AppDialogAlertComponent} from "../dialog/alert/alert.component";

@Injectable()
export class CanActiveViaAuthGuard implements CanActivate {

  constructor(private store: Store<AppStore>, private router: Router, private sessionService: SessionService, private dialog: MatDialog) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.sessionService
      .isAuthenticated()
      .switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          return this.sessionService
            .refresh()
            .switchMap((isRefreshed: boolean) => {
              if (!isRefreshed) {
                this.dialog.open(AppDialogAlertComponent, {
                  data: {
                    message: '로그인 후 이용해 주세요.',
                    ok: '확인'
                  }
                });
                this.store.dispatch(new RouterActions.Go({path: ['/login']}));
                return Observable.of(false);
              }else {
                return Observable.of(true);
              }
            });
        } else {
          return Observable.of(true);
        }
      });
      /*.switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          this.sessionService.destory();
          this.store.dispatch(new RouterActions.Go({path: ['/login']}));
          return Observable.of(false);
        } else {
          return Observable.of(true);
        }
      });*/
  }
}
