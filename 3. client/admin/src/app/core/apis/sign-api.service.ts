import {Injectable} from '@angular/core';
import {HttpService} from '../services/http.service';
import {BaseApiService} from './base-api.service';
import {IResponse} from '../helpers/response';
import {Observable} from 'rxjs';

@Injectable()
export class MembershipApiService extends BaseApiService {
  constructor(http: HttpService) {
    super('sign', http);
  }

  signin(id: string, pass: string): Observable<IResponse<any>> {
    const params = {
      id: id,
      pass: pass
    };
    return this.http.post(`${this.controllerName}/in`, params);
  }

  logout(): Observable<IResponse<any>> {
    return this.http.delete(`${this.controllerName}`, {});
  }

  initialize(id: string, oldPass: string, newPass: string): Observable<IResponse<any>> {
    const params = {
      userId: id,
      oldPass: oldPass,
      newPass: newPass
    };
    return this.http.put(`${this.controllerName}/init`, params);
  }

}
