import {RouterEffect} from "./core/router/router.effect";
import {AccountEffect} from "./core/redux/account/effect";
import {AuthEffect} from "./core/redux/auth/effect";
import {UserEffect} from "./core/redux/user/effect";
import {NoticeEffect} from "./page/notice/redux/notice.effect";
import {InquiryEffect} from "./page/inquiry/redux/inquiry.effect";

export const effects = [
  RouterEffect,
  AccountEffect,
  AuthEffect,
  UserEffect,
  NoticeEffect,
  InquiryEffect
];
