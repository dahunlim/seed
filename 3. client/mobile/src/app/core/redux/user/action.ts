import {Action} from "@ngrx/store";
import {User} from "../../model/user";


export const USER_MODIFY_ME = 'USER_MODIFY_ME';
export class UserModifyMe implements Action {
  readonly type = USER_MODIFY_ME;
  constructor(public user: User) {}
}

export const USER_DELETE ='USER_DELETE';
export class UserDelete implements Action {
  readonly type = USER_DELETE;
  constructor() {}
}

export const USER_EXIST ='USER_EXIST';
export class UserExist implements Action {
  readonly type = USER_EXIST;
  constructor(public user_id: string) {}
}

export const USER_EXIST_SUCCESS = 'USER_EXIST_SUCCESS';
export class UserExistSuccess implements Action {
  readonly type = USER_EXIST_SUCCESS;
  constructor(public check: any) {}
}

export const USER_CLEAR = 'USER_CLEAR';
export class UserClear implements Action {
  readonly type = USER_CLEAR;
  constructor() {}
}

export type All =
  UserModifyMe |
  UserDelete |
  UserExist |
  UserExistSuccess |
  UserClear
  ;
