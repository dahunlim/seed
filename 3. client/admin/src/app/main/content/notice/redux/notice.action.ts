import {Action} from '@ngrx/store';
import {Notice} from '../../../../core/models/notice';

import * as RouterActions from '../../../../core/router/router.action';



export const NOTICE_GET_LIST = 'NOTICE_GET_LIST';
export class NoticeGetList implements Action {
  readonly type = NOTICE_GET_LIST;
  constructor(public offset: number, public count: number, public keyword?: string) {
  }
}

export const NOTICE_GET_LIST_SUCCESS = 'NOTICE_GET_LIST_SUCCESS';
export class NoticeGetListSuccess implements Action {
  readonly type = NOTICE_GET_LIST_SUCCESS;
  constructor(public total: number, public list: Notice[]) {
  }
}

export const NOTICE_SELECT = 'NOTICE_SELECT';
export class NoticeSelect implements Action {
  readonly type = NOTICE_SELECT;
  constructor(public notice: Notice) { }
}

export const NOTICE_SELECT_CANCEL = 'NOTICE_SELECT_CANCEL';
export class NoticeSelectCancel implements Action {
  readonly type = NOTICE_SELECT_CANCEL;
  constructor() { }
}

export const NOTICE_CREATE = 'NOTICE_CREATE';
export class NoticeCreate implements Action {
  readonly type = NOTICE_CREATE;
  constructor(public notice: Notice) {
  }
}

export const NOTICE_MODIFY = 'NOTICE_MODIFY';
export class NoticeModify implements Action {
  readonly type = NOTICE_MODIFY;
  constructor(public notice: Notice) {}
}

export const NOTICE_DELETE = 'NOTICE_DELETE';
export class NoticeDelete implements Action {
  readonly type = NOTICE_DELETE;
  constructor(public notice: Notice, public reloadAction: NoticeGetList) {
  }
}

export type All =
  NoticeGetList |
  NoticeGetListSuccess |
  NoticeSelect |
  NoticeSelectCancel |
  NoticeCreate |
  NoticeModify |
  NoticeDelete;
