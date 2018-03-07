import {RouterEffect} from './core/router/router.effect';
import {NoticeEffect} from './page/notice/redux/notice.effect';
import {AccountEffect} from './page/account/redux/account.effect';
import {InquiryEffect} from './page/inquiry/redux/inquiry.effect';

export const appEffects = [
  RouterEffect,
  NoticeEffect,
  AccountEffect,
  InquiryEffect
];
