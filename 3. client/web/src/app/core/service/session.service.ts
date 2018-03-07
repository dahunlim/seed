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
    this.setTImeout(data.expire);
  }

  isAuthenticated(): Observable<boolean> {
    const localSession = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_NAME));
    return Observable.of((localSession && !this.isExpired(localSession['expire'])) ? true : false);
  }

  private setTImeout(expire: string){
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
          this.setTImeout(res.data.expire);
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

/*
  private LOCAL_STORAGE_NAME: string = 'aram-session';
  private timeout: any = null;

  constructor(private http: HttpService) { }

  init(res: {data: any, expire: string}): void {
    localStorage.clear();
    localStorage.setItem(this.LOCAL_STORAGE_NAME, JSON.stringify(res.data));
  }

  isAuthenticated(): Observable<boolean> {
    const localSession = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_NAME));
    if (localSession) {
      return Observable.create(subscribe => subscribe.next((localSession && !this.isExpired(localSession['expire'])) ? true : false));
    } else {
      return this.refresh();
    }
  }

  public refresh(): Observable<boolean> {
    return this.http.put<IResponse<any>>(`session`, {})
      .map((res: IResponse<any>) => {
        if (res && res.code === RESPONSE_CODE.SUCCESS) {
          localStorage.setItem(this.LOCAL_STORAGE_NAME, JSON.stringify(res.data));
          const timeoutCount = Date.parse(res.data['expire']) - Date.now() - 3600000;

          if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
          }
          this.timeout = setTimeout(() => {
            clearTimeout(this.timeout);
            this.refresh();
          }, timeoutCount);
          return true;
        } else {
          return false;
        }
      });
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
    if (expire) {
      const expireDate = Date.parse(expire);
      return expireDate <= Date.now();
    } else {
      return true;
    }
  }*/
}
