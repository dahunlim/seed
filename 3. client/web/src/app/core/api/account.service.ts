import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

import {HttpService} from '../service/http.service';
import {BaseService} from './base.service';
import {IResponse} from '../service/response.service';
import {Join} from '../model/join';

@Injectable()
export class AccountService extends BaseService {

  constructor(http: HttpService) {
    super('join', http);
  }

  public join(item: Join):
  Observable<IResponse<any>> {
    return this.http.post('join', item.toObject())
      .map(res => res);
  }
}
