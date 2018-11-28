import {routerReducer} from '@ngrx/router-store';
import {noticeReducer} from './core/redux/notice/reducer';
import {accountReducer} from './core/redux/account/reducer';
import {inquiryReducer} from './core/redux/inquiry/reducer';

export const reducers = {
  router: routerReducer,
  notice: noticeReducer,
  inquiry: inquiryReducer,
  account: accountReducer
};
