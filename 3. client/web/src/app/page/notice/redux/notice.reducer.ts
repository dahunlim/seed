import {INoticeState, NoticeState} from "./notice.state";
import * as NoticeAction from "./notice.action";
import {NoticeGetDetailSuccess, NoticeGetListSuccess} from './notice.action';

export type Action = NoticeAction.All;
export const initState: INoticeState = NoticeState() as INoticeState;

export function noticeReducer(state: INoticeState = initState, action: Action) {
  switch (action.type) {
    case NoticeAction.NOTICE_GET_LIST_SUCCESS:
      return state.merge({
        list: action.list,
        totalCount: action.total
      });
    case NoticeAction.NOTICE_GET_DETAIL_SUCCESS:
      return state.merge({
        selectedNotice: (action as NoticeGetDetailSuccess).notice
      });
    default:
      return state;
  }
}
