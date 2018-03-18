import {Store} from '@ngrx/store';

import {AppStore} from '../../app-store.interface';
import {SessionService} from '../service/session.service';
import * as RouterActions from '../../core/router/router.action';
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard {

  constructor(protected store: Store<AppStore>, protected sessionService: SessionService) {
    // console.log('AuthGuard');
  }

  ionViewCanEnter(): Observable<boolean> | Promise<boolean> | boolean {
    return this.sessionService
      .isAuthenticated()
      .switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          return this.sessionService
            .refresh()
            .switchMap((isRefreshed: boolean) => {
              if (!isRefreshed) {
                // this.dialog.open(FuseAlertDialogComponent, { data: { message: '로그인 후 이용해 주세요.' }});
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


/*  private store: Store<AppStore>;
  private sessionService: SessionService;
  private alert: AlertController;

  constructor(store: Store<AppStore>, sessionService: SessionService, alert: AlertController) {
    this.store = store;
    this.sessionService = sessionService;
    this.alert = alert;
  }

  ionViewCanEnter(): Observable<boolean> | Promise<void> | boolean{
    return this.sessionService
      .isAuthenticated()
      .switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          this.sessionService.destory();
          this.store.dispatch(new RouterActions.Go('SigninComponent'));
          return Observable.of(false);
        } else {
          return Observable.of(true);
        }
      })

    /!*return new Promise<void>((resolve, reject) => {
      this.sessionService.isAuthenticated()
        .subscribe(isAuthenticated => {
          if (!isAuthenticated) {
            this.alert.create({
              title: '경고',
              subTitle: '로그인 후 이용해 주세요.',
              cssClass: 'common-alert',
              buttons: [
                {
                  text: '확인'
                }
              ]
            }).present();
            this.store.dispatch(new RouterActions.Go('SigninComponent'));
            // reject();
          } else {
            this.store.dispatch(new RouterActions.Go('HomeComponent'));
            // resolve();
          }
        });
    });*!/
  }*/
}
