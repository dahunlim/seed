import {Injectable} from '@angular/core';
import {HttpService} from '../services/aram/http.service';
import {BaseApiService} from './base-api.service';

@Injectable()
export class UserApiService extends BaseApiService {
  constructor(http: HttpService) {
    super('users', http);
  }
}
