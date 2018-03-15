import {List, Map, Record} from 'immutable';
import {Notice} from "../../../core/model/notice";

export interface INoticeState extends Map<string, any> {
  list: List<Notice>;
  selectedNotice: Notice;
  pageNumber: number;
  totalCount: number;
  code: number;
}

export const NoticeState = Record({
  list: null,
  selectedNotice: null,
  pageNumber: 1,
  totalCount: 0,
  code: null
});
