import {Injectable} from "@angular/core";
import {HttpService} from "../service/http.service";
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {IResponse} from "../service/response.service";
import {Testdata} from "../model/testdata";

@Injectable()
export class TestService extends BaseService {
  constructor(http: HttpService) {
    super('test', http);
  }

  public data(_id: string, contents: string, title: string): Observable<IResponse<Testdata>> {
    console.log('logins action');
    return this.http.post(`${this.controllerName}`, {id: _id, contents: contents, title: title});
  }
}
