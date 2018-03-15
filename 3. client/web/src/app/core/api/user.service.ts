import {Injectable} from '@angular/core';
import {HttpService} from '../service/http.service';
import {BaseService} from './base.service';
import {Observable} from 'rxjs/Observable';
import {IResponse} from '../service/response.service';

@Injectable()
export class UserService extends BaseService {

  constructor(http: HttpService) {
    super('users', http);
  }

  public list<T>(offset: number, count: number, level?: number, state?: number, keyword?: string, manager?: string): Observable<IResponse<T>> {
    const params = {
      offset: offset,
      count: count,
      level: level,
      state: state,
      keyword: keyword,
      manager: manager
    };

    return this.http.get(`${this.controllerName}`, params)
  }
}
