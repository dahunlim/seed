import {IAccountState} from "./page/account/redux/account.state";
import {INoticeState} from "./page/notice/redux/notice.state";
import {IInquiryState} from "./page/inquiry/redux/inquiry.state";

export interface AppStore {
  account: IAccountState;
  notice: INoticeState;
  inquiry: IInquiryState;
}
