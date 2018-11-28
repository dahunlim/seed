import {Action} from "@ngrx/store";
import {Inquiry} from "../../model/inquiry";

export const INQUIRY_GET_LIST = "INQUIRY_GET_LIST";
export class InquiryGetList implements Action {
  readonly type = INQUIRY_GET_LIST;
  constructor(public offset: number, public count: number, public keyword?: string) {}
}

export const INQUIRY_GET_LIST_SUCCESS = "INQUIRY_GET_LIST_SUCCESS";
export class InquiryGetListSuccess implements Action {
  readonly type = INQUIRY_GET_LIST_SUCCESS;
  constructor(public total: number, public list: Inquiry[]) {}
}

export const INQUIRY_GET_DETAIL = 'INQUIRY_GET_DETAIL';
export class InquiryGetDetail implements Action {
  readonly type = INQUIRY_GET_DETAIL;
  constructor(public inquiry_id: string) {}
}

export const INQUIRY_GET_DETAIL_SUCCESS = 'INQUIRY_GET_DETAIL_SUCCESS';
export class InquiryGetDetailSuccess implements Action {
  readonly type = INQUIRY_GET_DETAIL_SUCCESS;
  constructor(public inquiry: Inquiry) {}
}

export const INQUIRY_ADD = 'INQUIRY_ADD';
export class InquiryAdd implements Action {
  readonly type = INQUIRY_ADD;
  constructor(public inquiry: Inquiry) {}
}

export const INQUIRY_MODIFY = 'INQUIRY_MODIFY';
export class InquiryModify implements Action {
  readonly type = INQUIRY_MODIFY;
  constructor(public inquiry: Inquiry) {}
}

export const INQUIRY_DELETE = 'INQUIRY_DELETE';
export class InquiryDelete implements Action {
  readonly type = INQUIRY_DELETE;
  constructor(public inquiry_id: string) {}
}

export const INQUIRY_FILE_DOWNLOAD = 'INQUIRY_FILE_DOWNLOAD';
export class InquiryFileDownload implements Action {
  readonly type = INQUIRY_FILE_DOWNLOAD;
  constructor(public key: string, public name: string) {}
}

export type All =
  InquiryGetList |
  InquiryGetListSuccess |
  InquiryGetDetail |
  InquiryGetDetailSuccess |
  InquiryAdd |
  InquiryModify |
  InquiryDelete |
  InquiryFileDownload
;
