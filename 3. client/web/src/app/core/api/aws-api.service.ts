import {Injectable} from '@angular/core';
import {HttpService} from '../service/http.service';
import {BaseService} from './base.service';
import {Observable} from 'rxjs/Observable';
import {IResponse} from '../helper/response';
import {HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';

@Injectable()
export class AwsApiService extends BaseService {
  constructor(http: HttpService) {
    super('aws', http);
  }

  getDownloadUrl(file): Observable<IResponse<any>> {
    const params = {
      key: file.key,
      name: file.name,
      type: 'file'
    };
    return this.http.get<IResponse<any>>(`${this.controllerName}/downloadUrl`, params);
  }

  getUploadUrl(): Observable<IResponse<any>> {
    return this.http.get<IResponse<any>>(`${this.controllerName}/uploadUrl`, {});
  }

  upload(url: string, data: File | any) {
    const headers = new HttpHeaders({
      'Content-Type': ''
    });
    const options = {
      headers: headers
      // reportProgress: true
    };
    const httpRequest: HttpRequest<any> = new HttpRequest<any>('PUT', url, data, options);
    return this.http.getHttp().request<any>(httpRequest);
  }
}
