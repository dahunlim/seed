import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {IResponse, RESPONSE_CODE} from '../../helpers/response';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SessionService {

  private LOCAL_STORAGE_NAME: string = 'aram-session';
  private sub$: any;

  constructor(private http: HttpService) {}

  init(data: { data: any, expire: string }): void {
    localStorage.removeItem(this.LOCAL_STORAGE_NAME);
    localStorage.setItem(this.LOCAL_STORAGE_NAME, JSON.stringify(data));
    this.setPing();
  }

  isAuthenticated(): Observable<boolean> {
    const localSession = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_NAME));
    return Observable.of((localSession && !this.isExpired(localSession['expire'])) ? true : false);
  }

  public setPing(): void {
    const expire = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_NAME))['expire'];
    const timeoutCount = Date.parse(expire) - Date.now() - 60000;
    this.sub$ = Observable
      .interval(timeoutCount)
      .switchMap(() => this.refresh())
      .subscribe();
  }

  public refresh(): Observable<boolean> {
    return this.http.put<IResponse<any>>(`sessions`, {})
      .map((res: IResponse<any>) => {
        if (res && res.code === RESPONSE_CODE.SUCCESS) {
          localStorage.setItem(this.LOCAL_STORAGE_NAME, JSON.stringify(res.data));
          return true;
        } else {
          return false;
        }
      });
  }

  public getValue(key: string) {
    const localSession = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_NAME));
    return (!!localSession) ? localSession.data[key] : false;
  }

  public get(key: string) {
    const localSession = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_NAME));
    return (!!localSession) ? localSession.data[key] : false;
  }

  public destory() {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
    localStorage.removeItem(this.LOCAL_STORAGE_NAME);
    localStorage.clear();
  }

  private isExpired(expire: string): boolean {
    const expireDate = Date.parse(expire);
    return expireDate <= Date.now();
  }
}
