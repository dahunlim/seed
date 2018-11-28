import {IInquiryState, InquiryState} from "./state";
import * as InquiryAction from "./action";
import {InquiryGetDetailSuccess} from "./action";

export type Action = InquiryAction.All;
// export const initState: IInquiryState = InquiryState() as IInquiryState;
export const initState: IInquiryState = undefined as IInquiryState;

export function inquiryReducer(state: IInquiryState = initState, action: Action) {
  switch (action.type) {
    case InquiryAction.INQUIRY_GET_DETAIL_SUCCESS:
      return state.merge({
        selectedInquiry: (action as InquiryGetDetailSuccess).inquiry
      });
    default:
      return state;
  }
}
