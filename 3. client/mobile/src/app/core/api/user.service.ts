import {Injectable} from "@angular/core";
import {HttpService} from "../service/http.service";
import {BaseService} from "./base.service";
import {Observable} from "rxjs/Observable";
import {IResponse} from "../service/response.service";

@Injectable()
export class UserService extends BaseService {

  constructor(http: HttpService) {
    super('users', http);
  }

  push(push: boolean): Observable<IResponse<any>> {
    return this.http.put<IResponse<any>>(`${this.controllerName}/me/push`, {push: push});
  }

  putToken(token: string): Observable<IResponse<any>> {
    return this.http.put<IResponse<any>>(`${this.controllerName}/me/token`, {token: token});
  }
}
