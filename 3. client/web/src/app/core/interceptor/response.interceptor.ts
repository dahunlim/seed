import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import {IResponse, RESPONSE_CODE} from '../service/response.service';
import {AppStore} from '../../app-store.interface';
import * as RouterActions from '../../core/router/router.action';
import {MatDialog} from '@angular/material';
import {AppDialogAlertComponent} from '../dialog/alert/alert.component';


@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppStore>, private dialog: MatDialog) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .filter((ev: HttpEvent<any>) => ev instanceof HttpResponse)
      .do((res: HttpResponse<any>) => {
        if (res.status !== 200) {
          throw Observable.throw(res.body);
        }
      })
      .do((res: HttpResponse<IResponse<any>>) => {
        switch (res.body.code) {
          case RESPONSE_CODE.SUCCESS:
            break;
          case RESPONSE_CODE.NOT_AUTHENTICATION:

            this.store.dispatch(new RouterActions.Go({path: ['/login']}));
            break;
          case RESPONSE_CODE.NOT_GRANTED:
            this.dialog.open(AppDialogAlertComponent, {
              data: {
                message: res.body.msg,
                ok: '확인'
              }
            });
            this.store.dispatch(new RouterActions.Back());
            break;
          case RESPONSE_CODE.NO_RESULT:
            break;
          default:
            this.dialog.open(AppDialogAlertComponent, {
              data: {
                message: res.body.msg,
                ok: '확인'
              }
            });
        }
      })
      .catch((error: any, caught: Observable<any>) => {
        return Observable.of(error);
      });
  }
}
