import {Action} from '@ngrx/store';
import {User} from '../../models/user';

export const USER_GET_LIST = 'USER_GET_LIST';
export class UserGetList implements Action {
  readonly type = USER_GET_LIST;
  constructor(public offset: number, public count: number, public keyword?: string) { }
}

export const USER_GET_LIST_SUCCESS = 'USER_GET_LIST_SUCCESS';
export class UserGetListSuccess implements Action {
  readonly type = USER_GET_LIST_SUCCESS;
  constructor(public total: number, public list: User[]) { }
}

export const USER_GET_DETAIL = 'USER_GET_DETAIL';
export class UserGetDetail implements Action {
  readonly type = USER_GET_DETAIL;
  constructor(public userId: string){ }
}

export const USER_GET_DETAIL_SUCCESS = 'USER_GET_DETAIL_SUCCESS';
export class UserGetDetailSuccess implements Action {
  readonly type = USER_GET_DETAIL_SUCCESS;
  constructor(){ }
}

export const USER_SELECT = 'USER_SELECT';
export class UserSelect implements Action {
  readonly type = USER_SELECT;
  constructor(public user: User) { }
}

export const USER_CREATE = 'USER_CREATE';
export class UserCreate implements Action {
  readonly type = USER_CREATE;
  constructor(public user: User) { }
}

export const USER_MODIFY = 'USER_MODIFY';
export class UserModify implements Action {
  readonly type = USER_MODIFY;
  constructor(public user: User) { }
}

export const USER_DELETE = 'USER_DELETE';
export class UserDelete implements Action {
  readonly type = USER_DELETE;
  constructor(public userId: string) { }
}

export type All =
  UserGetList |
  UserGetListSuccess |
  UserGetDetail |
  UserGetDetailSuccess |
  UserSelect |
  UserCreate |
  UserModify |
  UserDelete;
