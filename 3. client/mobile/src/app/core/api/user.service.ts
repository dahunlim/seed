import {Injectable} from "@angular/core";
import {HttpService} from "../service/http.service";
import {BaseService} from "./base.service";
import {Observable} from "rxjs/Observable";
import {IResponse} from "../service/response.service";
import {User} from "../model/user";

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

  public changePassword(pass, newPass) {
    return this.http.put(`${this.controllerName}/me/password`, {pass: pass, newPass: newPass});
  }

  public resetPassword(pass, userId){
    return this.http.put(`${this.controllerName}/reset/pass`,{pass: pass, userId: userId})
  }

  public changePhone(phone){
    return this.http.put(`${this.controllerName}/me/phone`,{phone: phone})
  }

  public modifyMe(user: User){
    return this.http.put(`${this.controllerName}/me`, user.toObject())
  }

  public exist(user_id){
    return this.http.get(`${this.controllerName}/${user_id}/exist` ,{})
  }

  public deleteMe(){
    return this.http.delete(`${this.controllerName}/me`, {});
  }

  public me(){
    return this.http.get(`${this.controllerName}/me`);
  }
}
