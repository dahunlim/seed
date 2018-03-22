import {AppStore} from '../../../app-store.interface';
import {createSelector} from "@ngrx/store";
import {IAccountState} from "./account.state";

export const baseAccount = (state: AppStore) => state.account;

export const accountMobileCheckCode = createSelector(baseAccount, (state: IAccountState) => {
  return state.isMobileAuth;
});

export const accountSearchPasswordCode = createSelector(baseAccount, (state: IAccountState) => {
  return state.isPasswordAuth;
});

export const accountAddress = createSelector(baseAccount, (state: IAccountState) => {
  return state.address;
});
