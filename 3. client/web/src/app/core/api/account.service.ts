import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

import {HttpService} from "../service/http.service";
import {BaseService} from "./base.service";
import {IResponse} from "../service/response.service";
import {User} from "../model/user";

@Injectable()
export class AccountService extends BaseService{

  constructor(http: HttpService) {
    super('join', http);
  }

  public join(item: User):
  Observable<IResponse<any>> {
    return this.http.post('join', item.toObject())
      .map(res => res);
  }
}
