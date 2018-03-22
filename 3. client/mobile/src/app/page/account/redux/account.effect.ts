import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {ToastController, Platform} from "ionic-angular";

import * as AccountActions from './account.action';
import * as RouterActions from '../../../core/router/router.action';
import {IResponse, RESPONSE_CODE} from "../../../core/service/response.service";
import {Converter} from "../../../core/helper/converter";
import {AuthService} from '../../../core/api/auth.service';
import {AccountService} from "../../../core/api/account.service";
import {LoginService} from "../../../core/api/login.service";
import {SessionService} from "../../../core/service/session.service";
import {Login} from "../../../core/model/login";
import {UserService} from "../../../core/api/user.service";
import {Firebase} from "@ionic-native/firebase";

@Injectable()
export class AccountEffect {

  constructor(private toastCtrl: ToastController,
              private actions$: Actions,
              private accountService: AccountService,
              private loginService: LoginService,
              private sessionService: SessionService,
              private authService: AuthService,
              private userService: UserService,
              private firebase: Firebase,
              private platform: Platform,) {
  }

  toast(msg: string = 'null', position: string = 'top') {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: position
    }).present();
  }

  @Effect() login$ = this.actions$
    .ofType(AccountActions.ACCOUNT_LOGIN)
    .switchMap((action: AccountActions.AccountLogin) =>
      this.loginService.login(action.id, action.pass)
        .map((res: IResponse<any>) => {
          console.log(res);
          if (res.code === RESPONSE_CODE.SUCCESS) {
            this.sessionService.init(res.data);
            // Cordova Check;
            if(this.platform.is('cordova')) {
              this.firebase.getToken().then(token => {
                this.userService.putToken(token);
              });
            }
            return new RouterActions.Go('HomeComponent');
          } else {
            this.toast(res.msg);
            return {type: 'NO_ACTION'};
          }
        })
    );

  @Effect() loginGet$ = this.actions$
    .ofType(AccountActions.ACCOUNT_GET_LOGINED)
    .switchMap((action: AccountActions.AccountGetLogined) =>
      this.loginService.loginGet()
        .map((res: IResponse<Login>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            const login: Login = Converter.jsonToInstance<Login>(Login, res.data);
            return new AccountActions.AccountGetLoginedSuccess(login)
          } else {
            return {type: 'NO_ACTION'};
          }
        })
    );

  @Effect() signup$ = this.actions$
    .ofType(AccountActions.ACCOUNT_SIGNUP)
    .switchMap((action: AccountActions.AccountSignup) =>
      this.accountService.add(action.user)
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            this.toast('회원가입이 완료 되었습니다.');
            return new RouterActions.Go('SigninComponent');
          } else {
            this.toast(res.msg);
            return {type: 'NO_ACTION'};
          }
        })
    );

  @Effect() mobileSendCode$ = this.actions$
    .ofType(AccountActions.ACCOUNT_MOBILE_SEND_CODE)
    .switchMap((action: AccountActions.AccountMobileSendCode) => {
        return this.authService
          .mobileSend(action.phone)
          .map((res: IResponse<any>) => {
            if (res.code === RESPONSE_CODE.SUCCESS) {
              this.toast('인증번호가 전송되었습니다.');
            } else {
              this.toast(res.msg);
            }
            return {type: 'NO_ACTION'};
          })
      }
    );

  @Effect() passwordSendCode$ = this.actions$
    .ofType(AccountActions.ACCOUNT_PASSWORD_SEND_CODE)
    .switchMap((action: AccountActions.AccountPasswordSendCode) => {
        return this.authService
          .searchPasswordSend(action.id)
          .map((res: IResponse<any>) => {
            if (res.code === RESPONSE_CODE.SUCCESS) {
              this.toast('인증번호가 전송되었습니다.');
            } else {
              this.toast(res.msg);
            }
            return {type: 'NO_ACTION'};
          })
      }
    );

  @Effect() mobileCheckCode$ = this.actions$
    .ofType(AccountActions.ACCOUNT_MOBILE_CHECK_CODE)
    .switchMap((action: AccountActions.AccountMobileCheckCode) => {
      return this.authService
        .mobileCheck(action.code)
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            this.toast('인증에 성공하였습니다.');
            return new AccountActions.AccountMobileCheckCodeSuccess(true);
          } else {
            this.toast(res.msg);
            return {type: 'NO_ACTION'}
          }
        })
    });

  @Effect() passwordCheckCode$ = this.actions$
    .ofType(AccountActions.ACCOUNT_PASSWORD_CHECK_CODE)
    .switchMap((action: AccountActions.AccountPasswordCheckCode) => {
      return this.authService
        .searchPasswordCheck(action.code)
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            this.toast('인증에 성공하였습니다.');
            return new AccountActions.AccountPasswordCheckCodeSuccess(true);
          } else {
            this.toast(res.msg);
            return {type: 'NO_ACTION'}
          }
        })
    });

  @Effect() resetPassword$ = this.actions$
    .ofType(AccountActions.ACCOUNT_FORGOT_RESET_PASSWORD)
    .switchMap((action: AccountActions.AccountForgotResetPassword) =>
      this.authService.resetPassword(action.pass)
        .map((res: IResponse<any>) => {
          console.log(action);
          if (res.code === RESPONSE_CODE.SUCCESS) {
            this.toast('패스워드가 변경되었습니다.');
            return new RouterActions.Go('SigninComponent');
          } else {
            this.toast(res.msg);
            return {type: 'NO_ACTION'}
          }
        })
    );

  @Effect() accountLogout$ = this.actions$
    .ofType(AccountActions.ACCOUNT_LOGOUT)
    .switchMap((action: AccountActions.AccountLogout) => {
      return this.loginService.logout()
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            this.sessionService.destory();
            return new RouterActions.Go('SigninComponent');
          } else {
            this.toast(res.msg);
            return {type: 'NO_ACTION'};
          }
        });
    });
}
