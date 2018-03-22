import {Login} from "../../../core/model/login";
import {User} from "../../../core/model/user";
import {Action} from "@ngrx/store";

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

export const ACCOUNT_SIGNUP = 'ACCOUNT_SIGNUP';
export class AccountSignup implements Action  {
  readonly type = ACCOUNT_SIGNUP;
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

export const ACCOUNT_MOBILE_CHECK_CODE_SUCCESS = 'ACCOUNT_MOBILE_CHECK_CODE_SUCCESS';
export class AccountMobileCheckCodeSuccess implements Action {
  readonly type = ACCOUNT_MOBILE_CHECK_CODE_SUCCESS;
  constructor(public result: boolean) {}
}

export const ACCOUNT_MOBILE_RESET_CODE = 'ACCOUNT_MOBILE_RESET_CODE';
export class AccountMobileResetCode implements Action {
  readonly type = ACCOUNT_MOBILE_RESET_CODE;
  constructor() {}
}

/* 주소 */
export const ACCOUNT_ADDRESS_SET_CODE = 'ACCOUNT_ADDRESS_SET_CODE';
export class AccountAddressSetCode implements Action {
  readonly type = ACCOUNT_ADDRESS_SET_CODE;
  constructor(public postcode: string, public address: string) {}
}

export const ACCOUNT_ADDRESS_RESET_CODE = 'ACCOUNT_ADDRESS_RESET_CODE';
export class AccountAddressResetCode implements Action {
  readonly type = ACCOUNT_ADDRESS_RESET_CODE;
  constructor() {}
}

export const ACCOUNT_PASSWORD_SEND_CODE = 'ACCOUNT_PASSWORD_SEND_CODE';
export class AccountPasswordSendCode implements Action  {
  readonly type = ACCOUNT_PASSWORD_SEND_CODE;
  constructor(public id: string) {}
}

export const ACCOUNT_PASSWORD_CHECK_CODE = 'ACCOUNT_PASSWORD_CHECK_CODE';
export class AccountPasswordCheckCode implements Action {
  readonly type = ACCOUNT_PASSWORD_CHECK_CODE;
  constructor(public code: string) {}
}

export const ACCOUNT_PASSWORD_CHECK_CODE_SUCCESS = 'ACCOUNT_PASSWORD_CHECK_CODE_SUCCESS';
export class AccountPasswordCheckCodeSuccess implements Action {
  readonly type = ACCOUNT_PASSWORD_CHECK_CODE_SUCCESS;
  constructor(public result: boolean) {}
}

export const ACCOUNT_PASSWORD_RESET_CODE = 'ACCOUNT_PASSWORD_RESET_CODE';
export class AccountPasswordResetCode implements Action {
  readonly type = ACCOUNT_PASSWORD_RESET_CODE;
  constructor() {}
}

export const ACCOUNT_FORGOT_RESET_PASSWORD = 'ACCOUNT_FORGOT_RESET_PASSWORD';
export class AccountForgotResetPassword implements Action {
  readonly type = ACCOUNT_FORGOT_RESET_PASSWORD;
  constructor(public pass: string) {}
}

export const ACCOUNT_LOGOUT = 'ACCOUNT_LOGOUT';
export class AccountLogout implements Action {
  readonly type = ACCOUNT_LOGOUT;
  constructor() {}
}

export type All =
  AccountSignup |
  AccountMobileSendCode |
  AccountMobileCheckCode |
  AccountMobileCheckCodeSuccess |
  AccountMobileResetCode |
  AccountLogin |
  AccountGetLogined |
  AccountGetLoginedSuccess |
  AccountPasswordSendCode |
  AccountPasswordCheckCode |
  AccountPasswordCheckCodeSuccess |
  AccountPasswordResetCode |
  AccountForgotResetPassword |
  AccountAddressSetCode |
  AccountAddressResetCode
  ;
