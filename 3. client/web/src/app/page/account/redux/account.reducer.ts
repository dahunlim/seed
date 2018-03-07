import * as AccountActions from './account.action';
import {AccountState, IAccountState} from './account.state';
import {AccountCommonResponse, AccountGetLoginedSuccess, } from "./account.action";

export type Action = AccountActions.All;
export const initState: IAccountState = AccountState() as IAccountState;

export function accountReducer(state: IAccountState = initState, action: Action) {
  switch (action.type) {
    case AccountActions.ACCOUNT_GET_LOGINED_SUCCESS:
      return state.merge({
        accountList: action.login
      });
    case AccountActions.ACCOUNT_COMMON_RESPONSE:
      return state.merge({
        code: (action as AccountCommonResponse).code
      });
    default:
      return state;
  }
}
