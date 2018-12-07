import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpService} from "../service/http.service";
import {Observable} from "rxjs/Observable";
import {IResponse} from "../service/response.service";
import {Login} from "../model/login";
import {IModel} from "../model/interface";

@Injectable()
export class SignService extends BaseService {

  constructor(http: HttpService) {
    super('sign', http);
  }

  public in(id: string, pass: string): Observable<IResponse<any>> {
    return this.http.post(`${this.controllerName}/in`, {id: id, pass: pass});
  }

  public up(user: IModel): Observable<IResponse<any>> {
    return this.http.post(`${this.controllerName}/up`, user);
  }

  public loginGet(): Observable<IResponse<Login[]>> {
    return this.http.get(`users/me`, {})
  }

  public logout(): Observable<IResponse<Login[]>> {
    return this.http.delete(`${this.controllerName}`, {});
  }
}
