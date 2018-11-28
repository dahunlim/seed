import * as AccountActions from './action';
import {State, IAccountState} from './state';

export type Action = AccountActions.All;
// export const initState: IAccountState = State() as IAccountState;
export const initState: IAccountState = undefined as IAccountState;

export function accountReducer(state: IAccountState = initState, action: Action) {
  switch (action.type) {

  }
}
