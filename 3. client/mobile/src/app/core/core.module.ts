import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

import {HttpService} from "./service/http.service";
import {SessionService} from './service/session.service';
import {AccountService} from './api/account.service';
import {LoginService} from './api/login.service';
import {AuthService} from "./api/auth.service";
import {UserService} from "./api/user.service";
import {NoticeService} from "./api/notice.service";
import {InquiryService} from "./api/inquiry.service";
import {MediaService} from "./api/media.service";
import {DaumService} from "./service/daum.service";
// import {DialogModule} from "./dialog/dialog.module";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    // DialogModule
  ],
  exports: [
  ],
  declarations: [],
  entryComponents: [],
  providers: [
    HttpService,
    AccountService,
    LoginService,
    SessionService,
    AuthService,
    UserService,
    NoticeService,
    InquiryService,
    MediaService,
    DaumService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) { }
}
