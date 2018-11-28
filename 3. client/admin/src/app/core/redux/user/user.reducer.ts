import {IUserState, UserState} from './user.state';
import * as UserActions from './user.action';

export type Action = UserActions.All;
export const initUserState: IUserState = UserState() as IUserState;

export function userReducer(state: IUserState = initUserState, action: Action) {
  switch (action.type) {
    case UserActions.USER_GET_LIST_SUCCESS:
      action = action as UserActions.UserGetListSuccess;
      return  state.merge({
        total: action.total,
        list: action.list
      });

    case UserActions.USER_GET_DETAIL_SUCCESS:
      return state;

    case UserActions.USER_SELECT:
      action = action as UserActions.UserSelect;
      return state.merge({
        selectedUser: action.user
      });
    default:
      return state;
  }
}
