import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {NoticeService} from '../../../core/api/notice.service';
import * as NoticeActions from './notice.action';
import {Notice} from '../../../core/model/notice';
import {IResponse, RESPONSE_CODE} from '../../../core/service/response.service';
import {MediaService} from '../../../core/api/media.service';
import * as RouterActions from '../../../core/router/router.action';
import {Converter} from '../../../core/helper/converter';


@Injectable()
export class NoticeEffect {

  @Effect() NoticeGetList$ = this.actions$
    .ofType(NoticeActions.NOTICE_GET_LIST)
    .switchMap((action: NoticeActions.NoticeGetList) => {
      return this.noticeService.list(action.offset, action.count)
        .map((res: any) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            const list: Array<Notice> = Converter.jsonToInstance(Notice, res.data.list);
            return new NoticeActions.NoticeGetListSuccess(res.data.total, list)
          }
            return {type: 'NO_ACTION'};
        })
    });

  @Effect() NoticeGetDetail$ = this.actions$
    .ofType(NoticeActions.NOTICE_GET_DETAIL)
    .switchMap((action: NoticeActions.NoticeGetDetail) => {
      return this.noticeService
        .get(action.notice_id)
        .map((res: IResponse<Notice>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            const notice: Notice = Converter.jsonToInstance<Notice>(Notice, res.data);
            return new NoticeActions.NoticeGetDetailSuccess(notice);
          } else {
            return {type: 'NO_ACTION'};
          }
        })
    });

  @Effect() NoticeDelete$ = this.actions$
    .ofType(NoticeActions.NOTICE_DELETE)
    .switchMap((action: NoticeActions.NoticeDelete) => {
      return this.noticeService
        .delete(action.notice_id)
        .map((res: IResponse<Notice>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            return new RouterActions.Go({path: ['/main/notice/list/1']});
          }
          return {type: 'NO_ACTION'};
        })
    });

  @Effect() NoticeAdd$ = this.actions$
    .ofType(NoticeActions.NOTICE_ADD)
    .switchMap((action: NoticeActions.NoticeAdd) => {
      return this.noticeService
        .add<Notice>(action.notice, false)
        // .filter(data => {
        //   if (!!data) {
        //     return true
        //   } else {
        //     return false
        //   }
        // })
        .map((res: IResponse<Notice>) => {
          switch (res.code) {
            case RESPONSE_CODE.SUCCESS:
              return new RouterActions.Go({path: ['/main/notice/list/1']});
            default:
              return {type: 'NO_ACTION'};
          }
        })
    });

  @Effect() NoticeModify$ = this.actions$
    .ofType(NoticeActions.NOTICE_MODIFY)
    .switchMap((action: NoticeActions.NoticeModify) => {
      return this.noticeService
        .modify<Notice>(action.notice, true)
        .map((res: IResponse<Notice>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            return new RouterActions.Go({path: [`/main/notice/detail/${action.notice._id}`]});
          }
          return {type: 'NO_ACTION'};
        })
    });

  @Effect() NoticeFileDownload$ = this.actions$
    .ofType(NoticeActions.NOTICE_FILE_DOWNLOAD)
    .switchMap((action: NoticeActions.NoticeFileDownload) => {
      return this.mediaService
        .download(action.key, action.name)
        .map((res: any) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            window.open(res.data);
          }
          return {type: 'NO_ACTION'};
        })
    });

  constructor( private actions$: Actions, private noticeService: NoticeService, private mediaService: MediaService, private router: Router ) { }
}
