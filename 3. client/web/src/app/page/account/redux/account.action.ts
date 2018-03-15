import {Action} from '@ngrx/store';
import {Join} from 'app/core/model/join';

export const ACCOUNT_LOGIN = 'ACCOUNT_LOGIN';
export class AccountLogin implements Action  {
  readonly type = ACCOUNT_LOGIN;
  constructor(public id: string, public pass: string) {}
}

export const ACCOUNT_JOIN = 'ACCOUNT_JOIN';
export class AccountJoin implements Action {
  readonly type = ACCOUNT_JOIN;
  constructor(public join: Join) {}
}

export const ACCOUNT_RESET_PW = 'ACCOUNT_RESETPW';
export class AccountResetPw implements Action {
  readonly type = ACCOUNT_RESET_PW;
  constructor(public pass: string) {}
}

export type All =
  AccountLogin |
  AccountJoin |
  AccountResetPw
  ;
