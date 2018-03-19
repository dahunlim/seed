import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpService} from '../service/http.service';
import {Observable} from 'rxjs/Observable';
import {IResponse} from '../service/response.service';
import {Login} from '../model/login';

@Injectable()
export class LoginService extends BaseService {

  constructor(http: HttpService) {
    super('login', http);
  }

  public login(id: string, pass: string): Observable<IResponse<Login[]>> {
    return this.http.post(`${this.controllerName}`, {id: id, pass: pass});
  }
}
