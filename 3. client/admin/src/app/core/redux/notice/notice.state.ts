import {Record, Map} from 'immutable';
import {Notice} from '../../models/notice';

export interface INoticeState extends Map<string, any> {
  list: Notice[];
  total: number;
  selectedNotice: Notice;
  error: string;
}

export const NoticeState = Record({
  list: [],
  total: 0,
  selectedNotice: null,
  error: ''
});
