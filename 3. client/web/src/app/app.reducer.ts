import {noticeReducer} from "./page/notice/redux/notice.reducer";
import {accountReducer} from './page/account/redux/account.reducer';
import {inquiryReducer} from "./page/inquiry/redux/inquiry.reducer";
import {routerReducer} from "@ngrx/router-store";

export const reducers = {
  router: routerReducer,
  notice: noticeReducer,
  inquiry: inquiryReducer,
  account: accountReducer
};
