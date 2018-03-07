import {Login} from '../../../core/model/login';
import {Action} from '@ngrx/store';
import {User} from '../../../core/model/user';

export const ACCOUNT_LOGIN = 'ACCOUNT_LOGIN';
export class AccountLogin implements Action  {
  readonly type = ACCOUNT_LOGIN;
  constructor(public id: string, public pass: string) {}
}

export const ACCOUNT_GET_LOGINED = 'ACCOUNT_GET_LOGINED';
export class AccountGetLogined implements Action {
  readonly type = ACCOUNT_GET_LOGINED;
  constructor() {}
}

export const ACCOUNT_GET_LOGINED_SUCCESS = 'ACCOUNT_GET_LOGINED_SUCCESS';
export class AccountGetLoginedSuccess implements Action {
  readonly type = ACCOUNT_GET_LOGINED_SUCCESS;
  constructor(public login: Login) {}
}

export const ACCOUNT_JOIN = 'ACCOUNT_JOIN';
export class AccountJoin implements Action  {
  readonly type = ACCOUNT_JOIN;
  constructor (public user: User) {}
}

export const ACCOUNT_MOBILE_SEND_CODE = 'ACCOUNT_MOBILE_SEND_CODE';
export class AccountMobileSendCode implements Action  {
  readonly type = ACCOUNT_MOBILE_SEND_CODE;
  constructor(public phone: string) {}
}

export const ACCOUNT_MOBILE_CHECK_CODE = 'ACCOUNT_MOBILE_CHECK_CODE';
export class AccountMobileCheckCode implements Action {
  readonly type = ACCOUNT_MOBILE_CHECK_CODE;
  constructor(public code: string) {}
}

export const ACCOUNT_LOGOUT = 'ACCOUNT_LOGOUT';
export class AccountLogout implements Action {
  readonly type = ACCOUNT_LOGOUT;
  constructor() {}
}

export const ACCOUNT_COMMON_RESPONSE = 'ACCOUNT_COMMON_RESPONSE';
export class AccountCommonResponse implements Action  {
  readonly type = ACCOUNT_COMMON_RESPONSE;
  constructor(public code: number) {}
}

export type All =
  AccountJoin |
  AccountMobileSendCode |
  AccountMobileCheckCode |
  AccountLogin |
  AccountGetLogined |
  AccountGetLoginedSuccess |
  AccountCommonResponse
  ;
