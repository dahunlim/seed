import {NgModule} from '@angular/core';
import {AuthApiService} from './auth-api.service';
import {AwsApiService} from './aws-api.service';
import {BaseApiService} from './base-api.service';
import {JoinApiService} from './join-api.service';
import {LoginApiService} from './login-api.service';
import {NoticeApiService} from './notice-api.service';
import {MembershipApiService} from './sign-api.service';
import {UserApiService} from './user-api.service';

@NgModule({
  imports: [],
  providers: [
    AuthApiService,
    AwsApiService,
    JoinApiService,
    LoginApiService,
    NoticeApiService,
    MembershipApiService,
    UserApiService
  ]
})
export class ApiModule {}
