import {RouterReducerState} from '@ngrx/router-store';

import {INoticeState} from './page/notice/redux/notice.state';
import {IAccountState} from './page/account/redux/account.state';
import {IInquiryState} from './page/inquiry/redux/inquiry.state';
import {IRouterStateUrl} from './core/router/router.state';

export interface AppStore {
  router: RouterReducerState<IRouterStateUrl>;
  notice: INoticeState;
  inquiry: IInquiryState;
  account: IAccountState;
}
