import {Map, Record} from "immutable";
import {Inquiry} from "../../../core/model/inquiry";

export interface IInquiryState extends Map<string, any> {
    list: Inquiry[];
    selectedInquiry: Inquiry;
    pageNumber: number;
    totalCount: number;
    code: number;
}

export const InquiryState = Record({
  list: [],
  selectedInquiry: null,
  pageNumber: 1,
  totalCount: 0,
  code: null
});
