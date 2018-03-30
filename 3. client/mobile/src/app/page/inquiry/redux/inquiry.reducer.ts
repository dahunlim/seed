import {IInquiryState, InquiryState} from "./inquiry.state";
import * as InquiryActions from "./inquiry.action";
import {InquiryGetDetailSuccess} from "./inquiry.action";

export type Action = InquiryActions.All;
export const initState: IInquiryState = InquiryState() as IInquiryState;

export function inquiryReducer(state: IInquiryState = initState, action: Action) {
  switch (action.type) {
    case InquiryActions.INQUIRY_GET_LIST_SUCCESS:
      return state.merge({
        list: action.list,
        totalCount: action.total
      });
    case InquiryActions.INQUIRY_GET_DETAIL_SUCCESS:
      return state.setIn(
        ['inquiry', action.inquiry._id], (action as InquiryGetDetailSuccess).inquiry
      );
    default:
      return state;
  }
}
