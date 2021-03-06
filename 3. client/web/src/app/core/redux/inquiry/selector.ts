import {AppStore} from "../../../app-store.interface";
import {createSelector} from "@ngrx/store";
import {IInquiryState} from "./state";

export const baseInquiry = (state: AppStore) => state.inquiry;
export const getInquiry = createSelector(baseInquiry, (state: IInquiryState) => {
  return state.list;
});

export const getInquiryTotalCount = createSelector(baseInquiry, (state: IInquiryState) => {
  return state.totalCount;
});

export const getSelectedInquiry = createSelector(baseInquiry, (state: IInquiryState) => {
  return state.selectedInquiry;
});
