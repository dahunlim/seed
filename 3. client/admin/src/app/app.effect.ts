import {UserEffect} from './main/content/user/redux/user.effect';
import {NoticeEffect} from './main/content/notice/redux/notice.effect';
import {RouterEffect} from './core/router/router.effect';

export const AppEffects = [
  RouterEffect,
  UserEffect,
  NoticeEffect
];
