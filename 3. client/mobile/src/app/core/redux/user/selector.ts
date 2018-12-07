import {AppStore} from '../../../app-store.interface';
import {createSelector} from "@ngrx/store";
import {IUserState} from "./state";

export const baseUser = (state: AppStore) => state.user;

export const userCheck = createSelector(baseUser, (state: IUserState) => {
  return state.check;
});
