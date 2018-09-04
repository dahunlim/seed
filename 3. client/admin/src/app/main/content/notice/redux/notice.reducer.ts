import {INoticeState, NoticeState} from './notice.state';
import * as NoticeActions from './notice.action';

export type Action = NoticeActions.All;
export const initState: INoticeState = NoticeState() as INoticeState;

export function noticeReducer(state: INoticeState = initState, action: Action) {
  switch (action.type) {

    case NoticeActions.NOTICE_GET_LIST_SUCCESS:
      action = action as NoticeActions.NoticeGetListSuccess;
      return  state.merge({
        total: action.total,
        list: action.list
      });

    case NoticeActions.NOTICE_SELECT:
      action = action as NoticeActions.NoticeSelect;
      return state.merge({
        selectedNotice: action.notice
      });

    case NoticeActions.NOTICE_SELECT_CANCEL:
      return state.merge({ selectedNotice: null});

    default:
      return state;
  }
}
