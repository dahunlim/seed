import {Action} from "@ngrx/store";


export const AUTH_MOBILE_SEND_CODE = 'AUTH_MOBILE_SEND_CODE';
export class AuthMobileSendCode implements Action  {
  readonly type = AUTH_MOBILE_SEND_CODE;
  constructor(public phone: string) {}
}

export const AUTH_MOBILE_SEND_CODE_SUCCESS = 'AUTH_MOBILE_SEND_CODE_SUCCESS';
export class AuthMobileSendCodeSuccess implements Action  {
  readonly type = AUTH_MOBILE_SEND_CODE_SUCCESS;
  constructor(public result: boolean) {}
}

export const AUTH_MOBILE_CHECK_CODE = 'AUTH_MOBILE_CHECK_CODE';
export class AuthMobileCheckCode implements Action {
  readonly type = AUTH_MOBILE_CHECK_CODE;
  constructor(public code: string) {}
}

export const AUTH_MOBILE_CHECK_CODE_SUCCESS = 'AUTH_MOBILE_CHECK_CODE_SUCCESS';
export class AuthMobileCheckCodeSuccess implements Action {
  readonly type = AUTH_MOBILE_CHECK_CODE_SUCCESS;
  constructor(public result: any) {}
}

export const AUTH_CLEAR = 'AUTH_CLEAR';
export class AuthClear implements Action {
  readonly type = AUTH_CLEAR;
  constructor() {}
}

export type All =
  AuthMobileSendCode |
  AuthMobileSendCodeSuccess |
  AuthMobileCheckCode |
  AuthMobileCheckCodeSuccess |
  AuthClear
  ;
