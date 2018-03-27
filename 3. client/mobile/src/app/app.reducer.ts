import {routerReducer} from "@ngrx/router-store";
import {accountReducer} from "./page/account/redux/account.reducer";
import {noticeReducer} from "./page/notice/redux/notice.reducer";

export const reducers = {
  router: routerReducer,
  account: accountReducer,
  notice: noticeReducer
};
