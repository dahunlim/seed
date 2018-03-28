import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {IResponse, RESPONSE_CODE} from './response.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SessionService {

  private LOCAL_STORAGE_NAME: string = 'aram-session';
  private timeout: any = null;

  constructor(private http: HttpService) { }

  init(data: {data: any, expire: string}): void {
    localStorage.removeItem(this.LOCAL_STORAGE_NAME);
    localStorage.setItem(this.LOCAL_STORAGE_NAME, JSON.stringify(data));
    this.setTimeout(data.expire);
  }

  isAuthenticated(): Observable<boolean> {
    let localSession;
    try {
      localSession = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_NAME));
    } catch (err) {
      console.error(err);
    }
    const result: boolean = (localSession && !this.isExpired(localSession['expire'])) ? true : false;
    return Observable.of(result);
  }

  private setTimeout(expire: string){
    const timeoutCount = Date.parse(expire) - Date.now() - 3600000;
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.timeout = setTimeout(() => {
      clearTimeout(this.timeout);
      this.refresh();
    }, timeoutCount);
  }

  public refresh(): Observable<boolean> {
    return this.http.put<IResponse<any>>(`session`, {})
      .map((res: IResponse<any>) => {
        if (res && res.code === RESPONSE_CODE.SUCCESS) {
          localStorage.setItem(this.LOCAL_STORAGE_NAME, JSON.stringify(res.data));
          this.setTimeout(res.data.expire);
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
    localStorage.removeItem(this.LOCAL_STORAGE_NAME);
    localStorage.clear();
  }

  private isExpired(expire: string): boolean {
    const expireDate = Date.parse(expire);
    return expireDate <= Date.now();
  }
}
