import {AppStore} from '../../../../app-store.interface';
import {IUserState} from './user.state';
import {createSelector} from '@ngrx/store';

export const baseUser = (state: AppStore) => state.user;

export const getUsers = createSelector(baseUser, (state: IUserState) => {
  return state.list;
});
export const getUserTotal = createSelector(baseUser, (state: IUserState) => {
  return state.total;
});
export const getSelectedUser = createSelector(baseUser, (state: IUserState) => {
  return state.selectedUser;
});
export const getSelectedUserDetail = createSelector(baseUser, (state: IUserState) => {
  return state.selectedUserDetail;
});
