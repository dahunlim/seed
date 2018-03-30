import {Injectable} from "@angular/core";
import {ToastController} from "ionic-angular";
// import {MediaService} from "../../../core/api/media.service";
import {InquiryService} from "../../../core/api/inquiry.service";
import {Actions, Effect} from "@ngrx/effects";

import * as InquiryActions from './inquiry.action';
import * as RouterActions from '../../../core/router/router.action';

import {RESPONSE_CODE} from "../../../core/service/response.service";
import {Inquiry} from "../../../core/model/inquiry";
import {Converter} from "../../../core/helper/converter";

@Injectable()
export class InquiryEffect {

  toast(msg: string = 'null', position: string = 'top') {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: position
    }).present();
  }

  @Effect() InquiryGetList$ = this.actions$
    .ofType(InquiryActions.INQUIRY_GET_LIST)
    .switchMap((action: InquiryActions.InquiryGetList) => {
      return this.inquiryService.list(action.offset, action.count)
        .map((res: any) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            const list: Array<Inquiry> = Converter.jsonToInstance(Inquiry, res.data.list);
            return new InquiryActions.InquiryGetListSuccess(res.data.total, list)
          }
          return {type: 'NO_ACTION'};
        })
    });

  @Effect() InquiryGetDetail$ = this.actions$
    .ofType(InquiryActions.INQUIRY_GET_DETAIL)
    .switchMap((action: InquiryActions.InquiryGetDetail) => {
      return this.inquiryService.get(action.inquiry_id)
        .map((res: any) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            const inquiry: Inquiry = Converter.jsonToInstance(Inquiry, res.data);
            return new InquiryActions.InquiryGetDetailSuccess(inquiry);
          }
          return {type: 'NO_ACTION'};
        })
    });

  @Effect() InquiryAdd$ = this.actions$
    .ofType(InquiryActions.INQUIRY_ADD)
    .switchMap((action: InquiryActions.InquiryAdd) => {
      return this.inquiryService.add(action.inquiry)
        .map((res: any) => {
          switch (res.code) {
            case RESPONSE_CODE.SUCCESS:
              return new RouterActions.Go('InquiryListComponent');
            default:
              return {type: 'NO_ACTION'};
          }
        })
    });

  @Effect() InquiryModify$ = this.actions$
    .ofType(InquiryActions.INQUIRY_MODIFY)
    .switchMap((action: InquiryActions.InquiryModify) => {
      return this.inquiryService.answer(action.inquiry)
        .map((res: any) => {
          switch (res.code) {
            case RESPONSE_CODE.SUCCESS:
              this.toast(res.msg);
              return new RouterActions.Go('InquiryListComponent');
            default:
              return {type: 'NO_ACTION'};
          }
        })
    });

  @Effect() InquiryDelete$ = this.actions$
    .ofType(InquiryActions.INQUIRY_DELETE)
    .switchMap((action: InquiryActions.InquiryDelete) => {
      return this.inquiryService.delete(action.inquiry_id)
        .map((res: any) => {
          switch (res.code) {
            case RESPONSE_CODE.SUCCESS:
              this.toast(res.msg);
              return new RouterActions.Go('InquiryListComponent');
            default:
              return {type: 'NO_ACTION'};
          }
        })
    });


  constructor( private actions$: Actions, private inquiryService: InquiryService, private toastCtrl: ToastController) { }
}
