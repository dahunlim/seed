import {Injectable} from '@angular/core';
import {BaseApiService} from './base-api.service';
import {HttpService} from '../services/aram/http.service';
import {User} from '../models/user';
import {IResponse} from '../helpers/response';

@Injectable()
export class JoinApiService extends BaseApiService {
  constructor(http: HttpService) {
    super('join', http);
  }

  public join(user: User){
    return this.http.post<IResponse<any>>('join', user.toObject());
  }
}

