import {IInquiryState, InquiryState} from "./inquiry.state";
import * as InquiryAction from "./inquiry.action";
import {InquiryGetDetailSuccess, InquiryGetListSuccess} from "./inquiry.action";
import {IResponse} from "../../../core/service/response.service";

export type Action = InquiryAction.All;
export const initState: IInquiryState = InquiryState() as IInquiryState;

export function inquiryReducer(state: IInquiryState = initState, action: Action) {
  switch (action.type) {
    case InquiryAction.INQUIRY_GET_LIST_SUCCESS:
      return state.merge({
        list: (action as InquiryGetListSuccess).list,
        totalCount: (action as InquiryGetListSuccess).total
      });
    case InquiryAction.INQUIRY_GET_DETAIL_SUCCESS:
      return state.merge({
        selectedInquiry: (action as InquiryGetDetailSuccess).inquiry
      });
    case InquiryAction.INQUIRY_COMMON_RESPONSE:
      const res: IResponse<any> = (action as InquiryAction.InquiryCommonResponse).response;
      return state.merge({
        code: res.code
      });
    default:
      return state;
  }
}
