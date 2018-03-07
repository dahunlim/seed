import {Injectable} from "@angular/core";
import {HttpService} from "../service/http.service";
import {BaseService} from "./base.service";
import {Observable} from "rxjs/Observable";
import {User} from "../model/user";
import {IResponse} from "../service/response.service";
import {Converter} from "../helper/converter";

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

  public userAllow(id: string, level: number): Observable<any> {
    return this.http.put(`${this.controllerName}/` + id + '/auth', {level: level})
  }
}
