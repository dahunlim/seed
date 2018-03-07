import {Injectable} from "@angular/core";
import {HttpService} from '../service/http.service';
import {BaseService} from './base.service';
import {AppStore} from "../../app-store.interface";
import {Store} from "@ngrx/store";

@Injectable()
export class AuthService extends BaseService {

  constructor(http: HttpService, private store: Store<AppStore>) {
    super('auth', http);
  }

  public mobileSend(phone) {
    return this.http.post(`${this.controllerName}/mobile`, {phone: phone});
  }

  public mobileCheck(code) {
    return this.http.get(`${this.controllerName}/mobile`, {code: code});
  }

  public resetPassword(pass) {
    return this.http.put(`${this.controllerName}/password`, {pass: pass})
  }

  public forgotSendCode(id) {
    return this.http.post(`${this.controllerName}/password`, {id: id})
  }

  public forgotCheckCode(code) {
    return this.http.get(`${this.controllerName}/password`, {code: code})
  }
}
