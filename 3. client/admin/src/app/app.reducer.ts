import {routerReducer} from '@ngrx/router-store';
import {storeFreeze} from 'ngrx-store-freeze';
import {noticeReducer} from './core/redux/notice/notice.reducer';
import {userReducer} from './core/redux/user/user.reducer';

export const reducers = {
  router: routerReducer,
  notice: noticeReducer,
  user: userReducer
};

export const metaReducers: any[] = [ storeFreeze ];
