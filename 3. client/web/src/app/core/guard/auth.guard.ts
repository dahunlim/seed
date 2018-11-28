import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AppStore} from '../../app-store.interface';
import {Store} from '@ngrx/store';
import {SessionService} from '../service/session.service';


@Injectable()
export class CanActiveViaAuthGuard implements CanActivate {

  constructor(private store: Store<AppStore>, private router: Router, private sessionService: SessionService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.sessionService
      .isAuthenticated()
      .switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          return this.sessionService
            .refresh()
            .switchMap((isRefreshed: boolean) => {
              if (!isRefreshed) {
                this.sessionService.destory();
                // this.store.dispatch(new RouterActions.Go({path: ['membership/login']}));
                return Observable.of(false);
              } else {
                return Observable.of(true);
              }
            });
        } else {
          return Observable.of(true);
        }
      });
  }
}
