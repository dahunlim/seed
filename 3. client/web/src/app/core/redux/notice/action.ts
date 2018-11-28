import {Action} from "@ngrx/store";
import {Notice} from "../../model/notice";


export const NOTICE_GET_LIST = "NOTICE_GET_LIST";
export class NoticeGetList implements Action {
  readonly type = NOTICE_GET_LIST;
  constructor(public offset: number, public count: number, public keyword?: string) {}
}

export const NOTICE_GET_LIST_SUCCESS = 'NOTICE_GET_LIST_SUCCESS';
export class NoticeGetListSuccess implements Action {
  readonly type = NOTICE_GET_LIST_SUCCESS;
  constructor(public total: number, public list: Notice[]) {}
}

export const NOTICE_GET_DETAIL = 'NOTICE_GET_DETAIL';
export class NoticeGetDetail implements Action {
  readonly type = NOTICE_GET_DETAIL;
  constructor(public notice_id: string) {}
}

export const NOTICE_GET_DETAIL_SUCCESS = 'NOTICE_GET_DETAIL_SUCCESS';
export class NoticeGetDetailSuccess implements Action {
  readonly type = NOTICE_GET_DETAIL_SUCCESS;
  constructor(public notice: Notice) {}
}

export const NOTICE_ADD = 'NOTICE_ADD';
export class NoticeAdd implements Action {
  readonly type = NOTICE_ADD;
  constructor(public notice: Notice) {}
}

export const NOTICE_MODIFY = 'NOTICE_MODIFY';
export class NoticeModify implements Action {
  readonly type = NOTICE_MODIFY;
  constructor(public notice: Notice) {}
}

export const NOTICE_DELETE = 'NOTICE_DELETE';
export class NoticeDelete implements Action {
  readonly type = NOTICE_DELETE;
  constructor(public notice_id: string) {}
}

export const NOTICE_FILE_DOWNLOAD = 'NOTICE_FILE_DOWNLOAD';
export class NoticeFileDownload implements Action {
  readonly type = NOTICE_FILE_DOWNLOAD;
  constructor(public key: string, public name: string) {}
}

export type All =
  NoticeGetList |
  NoticeGetListSuccess |
  NoticeGetDetail |
  NoticeGetDetailSuccess |
  NoticeAdd |
  NoticeModify |
  NoticeDelete |
  NoticeFileDownload;
