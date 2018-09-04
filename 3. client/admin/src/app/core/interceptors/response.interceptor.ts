import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import {IResponse, RESPONSE_CODE} from '../helpers/response';
import {AppStore} from '../../app-store.interface';
import * as RouterActions from '../../core/router/router.action';
import {MatDialog} from '@angular/material';
import {FuseAlertDialogComponent} from '../components/dialog/alert/alert-dialog.component';
import {SpinnerService} from '../modules/spinner/spinner.service';


@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppStore>, private dialog: MatDialog, private spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .filter((ev: HttpEvent<any>) => ev instanceof HttpResponse || ev.type === HttpEventType.UploadProgress)
      .map((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse && (ev as HttpResponse<any>).body !== null) {
          const res: HttpResponse<any> = ev;
          switch (res.body.code) {
            case RESPONSE_CODE.SUCCESS:
            case RESPONSE_CODE.NOT_INITIALIZED:
            case RESPONSE_CODE.NOT_SIGNED:
              break;
            case RESPONSE_CODE.NOT_AUTHENTICATION:
              this.store.dispatch(new RouterActions.Go({path: ['/membership/login']}));
              break;
            case RESPONSE_CODE.NOT_GRANTED:
              this.dialog.open(FuseAlertDialogComponent, {
                data: {
                  message: 'Not granted!',
                  ok: 'OK'
                }
              });
              this.store.dispatch(new RouterActions.Back());
              break;
            default:
              this.dialog.open(FuseAlertDialogComponent, {
                data: {
                  message: res.body.msg,
                  ok: 'OK'
                }
              });
          }
          return res.body;
        } else {
          return ev;
        }
      })
      .catch((error: any, caught: Observable<any>) => {
        return Observable.of({body: {code: RESPONSE_CODE.NETWORK_ERROR}});
      });
  }
}
