import * as UserActions from './action';
import {State, IUserState} from './state';
import {UserExistSuccess} from "./action";

export type Action = UserActions.All;
export const initState: IUserState = State() as IUserState;

export function userReducer(state: IUserState = initState, action: Action) {
  switch (action.type) {
    case UserActions.USER_EXIST_SUCCESS:
      return state.merge({
        check: (action as UserExistSuccess).check
      });
    case UserActions.USER_CLEAR:
      return initState;
    default:
      return state;
  }
}
