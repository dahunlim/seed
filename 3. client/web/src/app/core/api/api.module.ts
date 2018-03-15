import {NgModule} from '@angular/core';
import {AccountService} from './account.service';
import {AuthService} from './auth.service';
import {InquiryService} from './inquiry.service';
import {LoginService} from './login.service';
import {MediaService} from './media.service';
import {NoticeService} from './notice.service';
import {UserService} from './user.service';

@NgModule({
  imports: [],
  providers: [
    AccountService,
    AuthService,
    InquiryService,
    LoginService,
    MediaService,
    NoticeService,
    UserService
  ]
})
export class ApiModule {}
