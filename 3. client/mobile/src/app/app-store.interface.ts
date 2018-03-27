import {IAccountState} from "./page/account/redux/account.state";
import {INoticeState} from "./page/notice/redux/notice.state";

export interface AppStore {
  account: IAccountState;
  notice: INoticeState;
}
