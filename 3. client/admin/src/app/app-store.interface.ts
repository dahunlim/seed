import {RouterReducerState} from '@ngrx/router-store';
import {IRouterStateUrl} from './core/router/router.state';
import {INoticeState} from './main/content/notice/redux/notice.state';
import {IUserState} from './main/content/user/redux/user.state';

export interface AppStore {
  router: RouterReducerState<IRouterStateUrl>;
  notice: INoticeState;
  user: IUserState;
}
