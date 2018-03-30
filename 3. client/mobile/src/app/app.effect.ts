import {RouterEffect} from "./core/router/router.effect";
import {AccountEffect} from "./page/account/redux/account.effect";
import {NoticeEffect} from "./page/notice/redux/notice.effect";
import {InquiryEffect} from "./page/inquiry/redux/inquiry.effect";

export const effects = [
  RouterEffect,
  AccountEffect,
  NoticeEffect,
  InquiryEffect
];
