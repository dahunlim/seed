import {IInquiryState, InquiryState} from "./inquiry.state";
import * as InquiryAction from "./inquiry.action";
import {InquiryGetDetailSuccess, InquiryGetListSuccess} from "./inquiry.action";

export type Action = InquiryAction.All;
export const initState: IInquiryState = InquiryState() as IInquiryState;

export function inquiryReducer(state: IInquiryState = initState, action: Action) {
  switch (action.type) {
    case InquiryAction.INQUIRY_GET_LIST_SUCCESS:
      return state.merge({
        list: action.list,
        totalCount: action.total
      });
    case InquiryAction.INQUIRY_GET_DETAIL_SUCCESS:
      return state.merge({
        selectedInquiry: (action as InquiryGetDetailSuccess).inquiry
      });
    default:
      return state;
  }
}
