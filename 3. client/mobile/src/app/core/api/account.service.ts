import {Injectable} from "@angular/core";

import {HttpService} from "../service/http.service";
import {BaseService} from "./base.service";

@Injectable()
export class AccountService extends BaseService{

  constructor(http: HttpService) {
    super('join', http);
  }

}
