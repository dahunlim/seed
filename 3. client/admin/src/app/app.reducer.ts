import {routerReducer} from '@ngrx/router-store';
import {noticeReducer} from './main/content/notice/redux/notice.reducer';
import {storeFreeze} from 'ngrx-store-freeze';
import {userReducer} from './main/content/user/redux/user.reducer';

export const reducers = {
  router: routerReducer,
  notice: noticeReducer,
  user: userReducer
};

export const metaReducers: any[] = [ storeFreeze ];
