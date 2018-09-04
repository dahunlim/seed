import {Injectable} from '@angular/core';
import {BaseApiService} from './base-api.service';
import {HttpService} from '../services/http.service';
import {Observable} from 'rxjs/Observable';
import {IResponse} from '../helpers/response';
import {Notice} from '../models/notice';

@Injectable()
export class NoticeApiService extends BaseApiService {
  constructor(http: HttpService) {
    super('notices', http);
  }

  deleteOne(notice: Notice): Observable<IResponse<any>> {
    return this.http.delete(`${this.controllerName}/${notice._id}`, {});
  }
}
