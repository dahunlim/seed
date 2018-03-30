import {List, Map, Record} from 'immutable';
import {Inquiry} from "../../../core/model/inquiry";

export interface IInquiryState extends Map<string, any> {
  list: List<Inquiry>;
  inquiry: Map<string, Inquiry>;
  pageNumber: number;
  totalCount: number;
}

export const InquiryState = Record({
  list: null,
  inquiry: Map<string, any>(),
  pageNumber: 1,
  totalCount: 0,
});
