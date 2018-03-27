import {List, Map, Record} from 'immutable';
import {Notice} from "../../../core/model/notice";

export interface INoticeState extends Map<string, any> {
  list: List<Notice>;
  notice: Map<string, Notice>;
  pageNumber: number;
  totalCount: number;
}

export const NoticeState = Record({
  list: null,
  notice: Map<string, any>(),
  pageNumber: 1,
  totalCount: 0,
});
