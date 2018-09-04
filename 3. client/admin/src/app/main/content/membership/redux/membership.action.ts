import {Action} from '@ngrx/store';
import {User} from '../../../../core/models/user';

export const MEMBERSHIP_REGISTER = 'MEMBERSHIP_REGISTER';
export class MembershipRegister implements Action {
  readonly type = MEMBERSHIP_REGISTER;
  constructor(public user: User) { }
}

export const MEMBERSHIP_LOGIN = 'MEMBERSHIP_LOGIN';
export class MembershipLogin implements Action {
  readonly type = MEMBERSHIP_LOGIN;
  constructor(public email: string, public pass: string) {}
}

export const MEMBERSHIP_INITIALIZE = 'MEMBERSHIP_INITIALIZE';
export class MembershipInitialize implements Action {
  readonly type = MEMBERSHIP_INITIALIZE;
  constructor(public email: string, public oldPass: string, public newPass) {}
}

export const MEMBERSHIP_LOGOUT = 'MEMBERSHIP_LOGOUT';
export class MembershipLogout implements Action {
  readonly type = MEMBERSHIP_LOGOUT;
  constructor() {}
}
