import {RouterEffect} from './core/router/router.effect';
import {UserEffect} from './core/redux/user/user.effect';
import {NoticeEffect} from './core/redux/notice/notice.effect';
import {MembershipEffect} from './core/redux/membership/membership.effect';

export const AppEffects = [
  RouterEffect,
  UserEffect,
  NoticeEffect,
  MembershipEffect
];
