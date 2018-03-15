import {AppStore} from "../../../app-store.interface";
import {INoticeState} from "./notice.state";
import {createSelector} from "@ngrx/store";

export const baseNotice = (state: AppStore) => state.notice;
/*export const getNoticeList = createSelector(baseNotice, (state: INoticeState) => {
  return state.list;
});*/

export const getNoticeTotalCount = createSelector(baseNotice, (state: INoticeState) => {
  return state.totalCount;
});

export const getSelectedNotice = createSelector(baseNotice, (state: INoticeState) => {
  return state.selectedNotice;
});

export const getResponse = createSelector(baseNotice, (state: INoticeState) => {
  return state.code
});
