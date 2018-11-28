import {INoticeState, NoticeState} from "./state";
import * as NoticeAction from "./action";
import {NoticeGetDetailSuccess, NoticeGetListSuccess} from './action';

export type Action = NoticeAction.All;
// export const initState: INoticeState = NoticeState() as INoticeState;
export const initState: INoticeState = undefined as INoticeState;

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
