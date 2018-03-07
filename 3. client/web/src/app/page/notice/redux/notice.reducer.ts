import {INoticeState, NoticeState} from "./notice.state";
import * as NoticeAction from "./notice.action";
import {NoticeGetDetailSuccess, NoticeGetListSuccess} from './notice.action';
import {IResponse, RESPONSE_CODE} from '../../../core/service/response.service';

export type Action = NoticeAction.All;
export const initState: INoticeState = NoticeState() as INoticeState;

export function noticeReducer(state: INoticeState = initState, action: Action) {
  switch (action.type) {
    case NoticeAction.NOTICE_GET_LIST_SUCCESS:
      return state.merge({
        list: (action as NoticeGetListSuccess).list,
        totalCount: (action as NoticeGetListSuccess).total
      });
    case NoticeAction.NOTICE_GET_DETAIL_SUCCESS:
      return state.merge({
        selectedNotice: (action as NoticeGetDetailSuccess).notice
      });
    case NoticeAction.NOTICE_COMMON_RESPONSE:
      const res: IResponse<any> = (action as NoticeAction.NoticeCommonResponse).response;
      return state.merge({
        code: res.code
      });
    default:
      return state;
  }
}
