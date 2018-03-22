import * as AccountActions from './account.action';
import {AccountState, IAccountState} from './account.state';
import {
  AccountGetLoginedSuccess, AccountMobileCheckCodeSuccess,
  AccountPasswordCheckCodeSuccess,
} from "./account.action";
import {Converter} from "../../../core/helper/converter";
import {User} from "../../../core/model/user";

export type Action = AccountActions.All;
export const initState: IAccountState = AccountState() as IAccountState;

export function accountReducer(state: IAccountState = initState, action: Action) {
  switch (action.type) {
    case AccountActions.ACCOUNT_MOBILE_CHECK_CODE_SUCCESS:
      return state.merge({
        isMobileAuth: (action as AccountMobileCheckCodeSuccess).result
      });
    case AccountActions.ACCOUNT_MOBILE_RESET_CODE:
      return state.merge({
        isMobileAuth: false
      });
    case AccountActions.ACCOUNT_PASSWORD_CHECK_CODE_SUCCESS:
      return state.merge({
        isPasswordAuth: (action as AccountPasswordCheckCodeSuccess).result
      });
    case AccountActions.ACCOUNT_PASSWORD_RESET_CODE:
      return state.merge({
        isPasswordAuth: false
      });
    case AccountActions.ACCOUNT_ADDRESS_SET_CODE:
      const address: User = Converter.jsonToInstance<User>(User, action);
      return state.merge({
        address: address
      });
    case AccountActions.ACCOUNT_ADDRESS_RESET_CODE:
      return state.merge({
        address: null
      });
    case AccountActions.ACCOUNT_GET_LOGINED_SUCCESS:
      return state.merge({
        accountList: (action as AccountGetLoginedSuccess).login
      });
    default:
      return state;
  }
}
