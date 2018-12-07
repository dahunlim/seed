import {routerReducer} from "@ngrx/router-store";
import {accountReducer} from "./core/redux/account/reducer";
import {authReducer} from "./core/redux/auth/reducer";
import {userReducer} from "./core/redux/user/reducer";
import {noticeReducer} from "./page/notice/redux/notice.reducer";
import {inquiryReducer} from "./page/inquiry/redux/inquiry.reducer";

export const reducers = {
  router: routerReducer,
  account: accountReducer,
  auth: authReducer,
  user: userReducer,
  notice: noticeReducer,
  inquiry: inquiryReducer
};
