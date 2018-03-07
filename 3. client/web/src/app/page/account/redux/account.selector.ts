import {AppStore} from '../../../app-store.interface';
import {createSelector} from '@ngrx/store';
import {IAccountState} from './account.state';

export const baseAccount = (state: AppStore) => state.account;

export const accountMobileAuthCodeCheck = createSelector(baseAccount, (state: IAccountState) => {
  return state.isChecked;
});

export const getLoginData = createSelector(baseAccount, (state: IAccountState) => {
  console.log(state.login);
  return state.login;
});

export const accountList = createSelector(baseAccount, (state: IAccountState) => {
  return state.accountList;
});

export const accountResponse = createSelector(baseAccount, (state: IAccountState) => {
  return state.code;
});
