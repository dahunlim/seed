import {RouterReducerState} from '@ngrx/router-store';
import {IRouterStateUrl} from './core/router/router.state';
import {INoticeState} from './core/redux/notice/notice.state';
import {IUserState} from './core/redux/user/user.state';

export interface AppStore {
  router: RouterReducerState<IRouterStateUrl>;
  notice: INoticeState;
  user: IUserState;
}
