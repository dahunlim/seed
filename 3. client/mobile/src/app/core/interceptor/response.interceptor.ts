import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {IResponse, RESPONSE_CODE} from "../service/response.service";
import {AppStore} from "../../app-store.interface";
import {Store} from "@ngrx/store";

import * as RouterActions from '../../core/router/router.action';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppStore>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .catch((error: any, caught: Observable<any>) => {
        return Observable.of(error);
      })
      .filter((ev: HttpEvent<any>) => ev instanceof HttpResponse)
      .do((res: HttpResponse<IResponse<any>>) => {
        switch (res.body.code) {
          case RESPONSE_CODE.SUCCESS:
            break;
          case RESPONSE_CODE.NOT_AUTHENTICATION:
            // this.sessionService.destory();
            this.store.dispatch(new RouterActions.Go('SigninComponent'));
            // console.log(res.body.msg);
            // this.sessionService.destory();
            // this.store.dispatch(new RouterActions.Back());
            break;
          case RESPONSE_CODE.NOT_GRANTED:
            // alert(res.body.msg);
            this.store.dispatch(new RouterActions.Back());
            break;
          case RESPONSE_CODE.NO_RESULT:
            // alert(res.body.msg);
            this.store.dispatch(new RouterActions.Back());
            break;
          default:
            break;
        }
      });
  }
}
