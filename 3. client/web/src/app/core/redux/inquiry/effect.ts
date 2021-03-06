import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import * as InquiryActions from './action';
import * as RouterActions from '../router/action';
import {IResponse, RESPONSE_CODE} from '../../service/response.service';
import {Inquiry} from '../../model/inquiry';
import {InquiryService} from 'app/core/api/inquiry.service';
import {MediaService} from 'app/core/api/media.service';
import {Router} from '@angular/router';
import {Converter} from '../../helper/converter';
import {switchMap} from "rxjs/operators";

@Injectable()
export class InquiryEffect {

  @Effect() InquiryGetList$ = this.action$.pipe(
    ofType(InquiryActions.INQUIRY_GET_LIST),
    switchMap((action: InquiryActions.InquiryGetList) => {
      return this.inquiryService
        .list(action.offset, action.count)
        .map((res: any) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            const list: Array<Inquiry> = Converter.jsonToInstance<Inquiry>(Inquiry, res.data.list);
            return new InquiryActions.InquiryGetListSuccess(res.data.total, list)
          } else {
            return {type: 'NO_ACTION'};
          }
        })
    })
  );

  @Effect() InquiryGetDetail$ = this.action$.pipe(
    ofType(InquiryActions.INQUIRY_GET_DETAIL),
    switchMap((action: InquiryActions.InquiryGetDetail) => {
      return this.inquiryService
        .get(action.inquiry_id)
        .map((res: IResponse<Inquiry>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            const inquiry: Inquiry = Converter.jsonToInstance<Inquiry>(Inquiry, res.data);
            return new InquiryActions.InquiryGetDetailSuccess(inquiry);
          } else {
            return {type: 'NO_ACTION'};
          }
        })
    })
  );

  @Effect() InquiryModify$ = this.action$.pipe(
    ofType(InquiryActions.INQUIRY_MODIFY),
    switchMap((action: InquiryActions.InquiryModify) => {
      return this.inquiryService
        .answer(action.inquiry)
        .map((res: IResponse<Inquiry>) => {
          switch (res.code) {
            case RESPONSE_CODE.SUCCESS:
              return new RouterActions.Go({path: [`/main/inquiry/detail/${action.inquiry._id}`]});
            default:
              return {type: 'NO_ACTION'};
          }
        })
    })
  );

  @Effect() InquiryAdd$ = this.action$.pipe(
    ofType(InquiryActions.INQUIRY_ADD),
    switchMap((action: InquiryActions.InquiryAdd) => {
      return this.inquiryService.add<Inquiry>(action.inquiry, true)
        .map((res: IResponse<Inquiry>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            return new RouterActions.Go({path: ['/main/inquiry/list/1']});
          } else {
            return {type: 'NO_ACTION'};
          }
        })
    })
  );

  @Effect() InquiryFileDownload$ = this.action$.pipe(
    ofType(InquiryActions.INQUIRY_FILE_DOWNLOAD),
    switchMap((action: InquiryActions.InquiryFileDownload) => {
      return this.mediaService
        .download(action.key, action.name)
        .map((res: any) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            window.open(res.data);
          }
          return {type: 'NO_ACTION'};
        })
    })
  );

  constructor(
    private action$: Actions,
    private inquiryService: InquiryService,
    private mediaService: MediaService
  ) { }
}
