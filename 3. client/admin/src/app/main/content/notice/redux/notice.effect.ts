import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {NoticeApiService} from '../../../../core/apis/notice-api.service';
import {IResponse, RESPONSE_CODE} from '../../../../core/helpers/response';

import * as NoticeActions from './notice.action';
import * as RouterActions from '../../../../core/router/router.action';
import {Notice} from '../../../../core/models/notice';
import {Converter} from '../../../../core/helpers/converter';

@Injectable()
export class NoticeEffect {

  @Effect() NoticeCreate$ = this.noticeActions$
    .ofType(NoticeActions.NOTICE_CREATE)
    .switchMap((action: NoticeActions.NoticeCreate) => {
      return this.noticeApiService
        .post(action.notice)
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            return new RouterActions.Go({path: ['/notice/list']});
          } else {
            return {type: 'NULL_ACTION'};
          }
        });
    });

  @Effect() noticeModify$ = this.noticeActions$
    .ofType(NoticeActions.NOTICE_MODIFY)
    .switchMap((action: NoticeActions.NoticeModify) => {
      return this.noticeApiService
        .modify(action.notice)
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            return new RouterActions.Go({path: ['notice/list']});
          } else {
            return {type: 'NULL_ACTION'};
          }
        });
    })

  @Effect() NoticeGetList$ = this.noticeActions$
    .ofType(NoticeActions.NOTICE_GET_LIST)
    .switchMap((action: NoticeActions.NoticeGetList) => {
      return this.noticeApiService
        .list(action.offset, action.count, {keyword: action.keyword})
        .map((res: IResponse<Notice[]>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            const notices: Notice[] = Converter.jsonToInstance<Notice>(Notice, res.data.list);
            return new NoticeActions.NoticeGetListSuccess(res.data.total, notices);
          } else {
            return {type: 'NULL_ACTION'};
          }
        });
    });

  @Effect() NoticeDelete$ = this.noticeActions$
    .ofType(NoticeActions.NOTICE_DELETE)
    .switchMap((action: NoticeActions.NoticeDelete) => {
      return this.noticeApiService
        .deleteOne(action.notice)
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            return action.reloadAction;
          } else {
            return {type: 'NULL_ACTION'};
          }
        });
    });

  constructor(private noticeActions$: Actions, private noticeApiService: NoticeApiService) {
  }
}
