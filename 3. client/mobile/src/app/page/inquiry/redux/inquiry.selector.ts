import {AppStore} from "../../../app-store.interface";
import {IInquiryState} from "./inquiry.state";
import {createSelector} from "@ngrx/store";

export const baseInquiry = (state: AppStore) => state.inquiry;
export const getInquiryList = createSelector(baseInquiry, (state: IInquiryState) => {
  return state.list;
});

export const getInquiryTotalCount = createSelector(baseInquiry, (state: IInquiryState) => {
  return state.totalCount;
});

export const getInquiryDetail = (inquiryId) => {
  return createSelector(baseInquiry, (state: IInquiryState) => {
    return state.inquiry.get(inquiryId);
  })
};

// createSelector(baseNotice, (state: INoticeState) => {
// return state.notice;
// });
