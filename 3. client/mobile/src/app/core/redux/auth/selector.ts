import {AppStore} from '../../../app-store.interface';
import {createSelector} from "@ngrx/store";
import {IAuthState} from "./state";

export const baseAuth = (state: AppStore) => state.auth;

export const authResult = createSelector(baseAuth, (state: IAuthState) => {
  return state.result;
});
