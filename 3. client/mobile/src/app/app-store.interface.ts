import {IAccountState} from "./core/redux/account/state";
import {IAuthState} from "./core/redux/auth/state";
import {IUserState} from "./core/redux/user/state";
import {INoticeState} from "./page/notice/redux/notice.state";
import {IInquiryState} from "./page/inquiry/redux/inquiry.state";

export interface AppStore {
  account: IAccountState;
  auth: IAuthState;
  user: IUserState;
  notice: INoticeState;
  inquiry: IInquiryState;
}
