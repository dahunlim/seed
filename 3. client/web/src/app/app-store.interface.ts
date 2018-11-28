import {RouterReducerState} from '@ngrx/router-store';
import {IRouterStateUrl} from './core/redux/router/router.state';

import {INoticeState} from './core/redux/notice/state';
import {IAccountState} from './core/redux/account/state';
import {IInquiryState} from './core/redux/inquiry/state';

export interface AppStore {
  router: RouterReducerState<IRouterStateUrl>;
  notice: INoticeState;
  inquiry: IInquiryState;
  account: IAccountState;
}
