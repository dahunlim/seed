import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpService} from '../service/http.service';
import {Observable} from "rxjs/Observable";
import {Inquiry} from "../model/inquiry";
import {IResponse} from '../service/response.service';

@Injectable()
export class InquiryService extends BaseService {
  constructor(http: HttpService) {
    super('inquiries', http);
  }

  public answer(inquiry: Inquiry): Observable<IResponse<any>> {
    const params = inquiry.answer;
    return this.http.put<IResponse<any>>(`${this.controllerName}/${inquiry._id}/answer`, params, true);
  }
}
