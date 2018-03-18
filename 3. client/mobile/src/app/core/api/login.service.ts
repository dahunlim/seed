import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpService} from "../service/http.service";
import {Observable} from "rxjs/Observable";
import {IResponse} from "../service/response.service";
import {Login} from "../model/login";

@Injectable()
export class LoginService extends BaseService {

  constructor(http: HttpService) {
    super('login', http);
  }

  public login(id: string, pass: string): Observable<IResponse<any>> {
    const params = {
      id: id,
      pass: pass
    };
    return this.http.post(`${this.controllerName}`, params);
  }

  public loginGet(): Observable<IResponse<Login[]>> {
    return this.http.get(`${this.controllerName}`, {})
  }

  public logout(): Observable<IResponse<Login[]>> {
    return this.http.delete(`${this.controllerName}`, {});
  }
}
