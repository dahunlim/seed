import {IAccountState} from "./pages/account/redux/account.state";
import {IFreezerState} from "./pages/main/freezer/redux/freezer.state";
import {IMypgeState} from "./pages/main/mypage/redux/mypage.state";
import {IAlarmState} from "./pages/main/alarm/redux/alarm.state";

export interface AppStore {
  account: IAccountState;
  freezer: IFreezerState;
  mypage: IMypgeState;
  alarm: IAlarmState;
}
