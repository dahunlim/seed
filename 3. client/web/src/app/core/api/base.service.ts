import {Observable} from 'rxjs/Observable';

import {HttpService} from '../service/http.service';
import {IResponse} from '../service/response.service';
import {IModel} from '../model/interface';

export class BaseService {

  protected controllerName: string;
  protected http: HttpService;

  constructor(_controllerName: string, _http: HttpService) {
    this.controllerName = _controllerName;
    this.http = _http;
  }

  public add<T>(item: IModel, withFile: boolean = false): Observable<IResponse<T>> {
    return this.http.post(`${this.controllerName}`, item.toObject(), withFile);
  }

  public get<T>(id: string): Observable<IResponse<IResponse<T>>> {
    return this.http.get<IResponse<T>>(`${this.controllerName}/${id}`);
  }

  public list<T>(offset: number, count: number, additional?: any): Observable<IResponse<T>> {
    const params = {
      count: count,
      offset: offset
    };
    if (typeof additional !== 'undefined') {
      Object.keys(additional).forEach(key => {
        params[key] = additional[key];
      });
    }
    return this.http.get<IResponse<T>>(`${this.controllerName}`, params);
  }

  public post<T>(item: IModel): Observable<IResponse<T>> {
    return this.http.post(`${this.controllerName}`, item.toObject());
  }

  public modify<T>(item: IModel, withFile: boolean = false): Observable<IResponse<T>> {
    return this.http.put(`${this.controllerName}/${item._id}`, item.toObject(), withFile);
  }

  public delete<T>(id: string): Observable<IResponse<T>> {
    return this.http.delete(`${this.controllerName}/${id}`);
  }
}
