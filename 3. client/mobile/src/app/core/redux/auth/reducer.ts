import * as AuthActions from './action';
import {State, IAuthState} from './state';
import {AuthMobileCheckCodeSuccess} from "./action";

export type Action = AuthActions.All;
export const initState: IAuthState = State() as IAuthState;

export function authReducer(state: IAuthState = initState, action: Action) {
  switch (action.type) {
    case AuthActions.AUTH_MOBILE_SEND_CODE_SUCCESS:
    case AuthActions.AUTH_MOBILE_CHECK_CODE_SUCCESS:
      return state.merge({
        result: (action as AuthMobileCheckCodeSuccess).result
      });
    case AuthActions.AUTH_CLEAR:
      return initState;
    default:
      return state;
  }
}
