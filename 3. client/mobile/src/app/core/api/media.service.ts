import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseService} from './base.service';
import {HttpService} from '../service/http.service';
import {IResponse} from '../service/response.service';

@Injectable()
export class MediaService extends BaseService {

  constructor(http: HttpService) {
    super('media', http);
  }

  public download(key: string, name: string): Observable<IResponse<any>> {
    const params = {
      key: key,
      name: name
    };
    return this.http.get(`${this.controllerName}/getDownloadUrl`, params)
      .map(function (res) {
        return res;
      });
  }
}
