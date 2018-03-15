import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseService} from './base.service';
import {HttpService} from '../service/http.service';
import {Notice} from '../model/notice';
import {IResponse} from '../service/response.service';

@Injectable()
export class NoticeService extends BaseService {

  constructor(http: HttpService) {
    super('notices', http);
  }

  public list(offset: number, count: number, filter?: object): Observable<IResponse<Notice[]>> {
    const params = {
      offset: offset,
      count: count,
      filter: filter
    };

    return this.http.get(`${this.controllerName}`, params)
      /*.map(function (res) {
        const notices: Notice[] = [];
        if (res.data.list !== undefined) {
          for (const i of Object.keys(res.data.list)) {
            const notice: Notice = new Notice();
            notice.fromJson(res.data.list[i]);
            notices.push(notice);
          }
        }

        res.data.list = notices;
        return res.data
      });*/
  }

  /*public content(id: string): Observable<Notice[]> {
    return this.http.get(`${this.controllerName}/` + id)
      // .map( res => res.data );
      .map(function (res) {
        console.log(res);
        return res.data
      });
  }*/
}
