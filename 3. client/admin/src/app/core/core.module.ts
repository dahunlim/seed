import {NgModule} from '@angular/core';
import {DaumService} from './services/daum.service';
import {HttpService} from './services/http.service';
import {SessionService} from './services/session.service';
import {CanActiveViaAuthGuard} from './guards/auth.guard';
import {NoticeApiService} from './apis/notice-api.service';
import {AuthApiService} from './apis/auth-api.service';
import {LoginApiService} from './apis/login-api.service';
import {JoinApiService} from './apis/join-api.service';
import {UserApiService} from './apis/user-api.service';
import {AwsApiService} from './apis/aws-api.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/delay';

import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/forkJoin';

import {SpinnerModule} from './modules/spinner/spinner.module';
import {MembershipApiService} from './apis/sign-api.service';
import {UploadService} from './services/upload.service';
import {BrowserAnimationsModule} from '../../../node_modules/@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '../../../node_modules/@angular/common/http';
import {FuseMainModule} from '../main/main.module';


@NgModule({
  imports: [
    SpinnerModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FuseMainModule
  ],
  exports: [
    SpinnerModule
  ],
  declarations: [],
  providers: [
    AwsApiService,
    UserApiService,
    NoticeApiService,
    DaumService,
    HttpService,
    SessionService,
    AuthApiService,
    LoginApiService,
    JoinApiService,
    MembershipApiService,
    UploadService,
    CanActiveViaAuthGuard
  ]
})
export class CoreModule {
}

