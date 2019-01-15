import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {ToastController} from "ionic-angular";

import * as AccountActions from './action';
import * as RouterActions from '../../router/router.action';
import {IResponse, RESPONSE_CODE} from "../../service/response.service";
import {Converter} from "../../helper/converter";
import {AuthService} from '../../api/auth.service';
import {SessionService} from "../../service/session.service";
import {Login} from "../../model/login";
import {SignService} from "../../api/sign.service";
import {UserService} from "../../api/user.service";

@Injectable()
export class AccountEffect {

  constructor(
    private toastCtrl: ToastController,
    private actions$: Actions,
    private signService: SignService,
    private sessionService: SessionService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  toast(msg: string = 'null', position: string = 'top') {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: position
    }).present();
  }

  @Effect() login$ = this.actions$
    .ofType(AccountActions.ACCOUNT_LOGIN)
    .switchMap((action: AccountActions.AccountLogin) => {
      console.log(action);
      return this.signService.in(action.id, action.pass)
          .map((res: IResponse<any>) => {
            if (res.code === RESPONSE_CODE.SUCCESS) {
              this.sessionService.init(res.data);
              return new RouterActions.SetRoot('TabsComponent');
            } else {
              this.toast(res.msg);
              return {type: 'NO_ACTION'};
            }
          })
    }

    );

  @Effect() loginGet$ = this.actions$
    .ofType(AccountActions.ACCOUNT_GET_LOGINED)
    .switchMap((action: AccountActions.AccountGetLogined) =>
      this.signService.loginGet()
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
      this.signService.up(action.user)
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            this.toast('회원가입이 완료 되었습니다.');
            return new AccountActions.AccountLogin(action.user._id, action.user.pass);
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

  // 비밀번호를 잃어버려 메인페이지에서
  @Effect() resetPassword$ = this.actions$
    .ofType(AccountActions.ACCOUNT_FORGOT_RESET_PASSWORD)
    .switchMap((action: AccountActions.AccountForgotResetPassword) =>
      this.userService.resetPassword(action.id, action.pass)
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            this.toast('패스워드가 변경되었습니다.');
            return {type: 'NO_ACTION'}
          } else {
            this.toast(res.msg);
            return {type: 'NO_ACTION'}
          }
        })
    );

  @Effect() accountLogout$ = this.actions$
    .ofType(AccountActions.ACCOUNT_LOGOUT)
    .switchMap((action: AccountActions.AccountLogout) => {
      return this.signService.logout()
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            this.sessionService.destory();
            return new RouterActions.SetRoot('HomeComponent');
          } else {
            this.toast(res.msg);
            return {type: 'NO_ACTION'};
          }
        });
    });
}
