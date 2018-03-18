import {routerReducer} from "@ngrx/router-store";
import {accountReducer} from "./page/account/redux/account.reducer";

export const reducers = {
  router: routerReducer,
  account: accountReducer
};
