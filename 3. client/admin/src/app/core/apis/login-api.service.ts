import {Injectable} from '@angular/core';
import {HttpService} from '../services/aram/http.service';
import {BaseApiService} from './base-api.service';
import {IResponse} from '../helpers/response';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginApiService extends BaseApiService {
  constructor(http: HttpService) {
    super('login', http);
  }

  login(id: string, pass: string) {
    const params = {
      _id: id,
      pass: pass
    };
    return this.http.post<IResponse<any>>('login', params);
  }

  initialize(user_id: string, old_pass: string, new_pass: string) {
    const params = {
      userId: user_id,
      oldPass: old_pass,
      newPass: new_pass
    };
    return this.http.put<IResponse<any>>(`${this.controllerName}/init`, params);
  }

  logout(): Observable<IResponse<any>> {
    return this.http.delete<IResponse<any>>(this.controllerName);
  }
}
