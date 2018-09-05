import {Observable} from 'rxjs/Observable';
import {HttpService} from '../services/aram/http.service';
import {IResponse} from '../helpers/response';
import {IModel} from '../models/interface';

export class BaseApiService {

  protected controllerName: string;
  protected http: HttpService;

  constructor(_controllerName: string, _http: HttpService) {
    this.controllerName = _controllerName;
    this.http = _http;
  }

  public add<T>(item: IModel, withFile: boolean = false): Observable<IResponse<T>> {
    return this.http.post(`${this.controllerName}`, item.toObject(), withFile);
  }

  public get<T>(id: string): Observable<IResponse<T>> {
    return this.http.get<IResponse<T>>(`${this.controllerName}/${id}`);
  }

  public list<T>(offset: number, count: number, additional: any = {}): Observable<IResponse<T>> {
    const params = {
      count: count,
      offset: offset
    };
    Object.keys(additional).forEach(key => params[key] = additional[key]);
    return this.http.get<IResponse<T>>(`${this.controllerName}`, params);
  }

  public post<T>(item: IModel): Observable<IResponse<T>> {
    return this.http.post(`${this.controllerName}`, item.toObject());
  }

  public modify<T>(item: IModel, withFile: boolean = false): Observable<IResponse<T>> {
    return this.http.put(`${this.controllerName}/${item._id}`, item.toObject(), withFile);
  }

  public delete<T>(idArr: string[]): Observable<IResponse<T>> {
    const params = {
      ids: idArr
    };
    return this.http.delete(`${this.controllerName}`, params);
  }
}
