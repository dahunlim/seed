import {RouterEffect} from './core/redux/router/effect';
import {NoticeEffect} from './core/redux/notice/effect';
import {AccountEffect} from './core/redux/account/effect';
import {InquiryEffect} from './core/redux/inquiry/effect';

export const appEffects = [
  RouterEffect,
  NoticeEffect,
  AccountEffect,
  InquiryEffect
];
