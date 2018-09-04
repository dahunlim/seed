import {AppStore} from '../../../../app-store.interface';
import {INoticeState} from './notice.state';
import {createSelector} from '@ngrx/store';

export const baseNotice = (state: AppStore) => {
  return state.notice;
}
export const getNotices = createSelector(baseNotice, (state: INoticeState) => {
  return state.list;
});
export const getTotal = createSelector(baseNotice, (state: INoticeState) => {
  return state.total;
});
export const getSelectedNotice = createSelector(baseNotice, (state: INoticeState) => {
  return state.selectedNotice;
});
