import {AppStore} from "../../../app-store.interface";
import {INoticeState} from "./notice.state";
import {createSelector} from "@ngrx/store";

export const baseNotice = (state: AppStore) => state.notice;
export const getNoticeList = createSelector(baseNotice, (state: INoticeState) => {
  return state.list;
});

export const getNoticeTotalCount = createSelector(baseNotice, (state: INoticeState) => {
  return state.totalCount;
});

export const getNoticeDetail = (noticeId) => {
  return createSelector(baseNotice, (state: INoticeState) => {
    return state.notice.get(noticeId);
  })
};

  // createSelector(baseNotice, (state: INoticeState) => {
  // return state.notice;
  // });
