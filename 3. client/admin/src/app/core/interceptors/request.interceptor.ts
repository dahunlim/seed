import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (!req.headers.has('Content-Type')) {
    //   req = req.clone({ headers: req.headers.set('Content-Type', 'application.json')});
    // }
    // req = req.clone({ headers: req.headers.set('Accept', 'application/json')});
    // return next.handle(req);
    return null;
  }
}
