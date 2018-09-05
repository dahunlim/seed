import {Injectable} from '@angular/core';
import {HttpService} from '../services/aram/http.service';
import {BaseApiService} from './base-api.service';
import {Observable} from 'rxjs/Observable';
import {IResponse} from '../helpers/response';
import {HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';

@Injectable()
export class AwsApiService extends BaseApiService {
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

  getUploadUrl(type: string): Observable<IResponse<any>> {
    const params = {
      type: type
    };
    return this.http.get<IResponse<any>>(`${this.controllerName}/uploadUrl`, params);
  }

  upload(url: string, data: File | any) {
    const headers = new HttpHeaders({
      'Content-Type': ''
    });
    const options = {
      headers: headers,
      withCredentials: true,
      reportProgress: true
    };
    const httpRequest: HttpRequest<any> = new HttpRequest<any>('PUT', url, data, options);
    return this.http.getHttp().request<any>(httpRequest);
  }

  uploadUrlData(url: string, data: any) {
    const headers = new HttpHeaders({
      'Content-Encoding': 'base64',
      'Content-Type': 'image/jpeg'
    });
    const options = {
      headers: headers,
      withCredentials: true,
      reportProgress: true
    };
    const httpRequest: HttpRequest<any> = new HttpRequest<any>('PUT', url, data, options);
    return this.http.getHttp().request<any>(httpRequest)
      .map((res: HttpResponse<any>) => res.body);
  }
}
