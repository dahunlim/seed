import * as AccountActions from './account.action';
import {AccountState, IAccountState} from './account.state';

export type Action = AccountActions.All;
export const initState: IAccountState = AccountState() as IAccountState;

export function accountReducer(state: IAccountState = initState, action: Action) {
  switch (action.type) {

  }
}
