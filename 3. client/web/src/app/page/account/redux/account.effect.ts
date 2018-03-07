import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import * as AccountActions from './account.action';
import * as RouterActions from '../../../core/router/router.action';
import {AuthService} from '../../../core/api/auth.service';
import {AccountService} from '../../../core/api/account.service';
import {LoginService} from '../../../core/api/login.service';
import {SessionService} from '../../../core/service/session.service';
import {IResponse, RESPONSE_CODE} from '../../../core/service/response.service';
import {Login} from '../../../core/model/login';
import {Converter} from '../../../core/helper/converter';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AccountEffect {

  @Effect() login$ = this.actions$
    .ofType(AccountActions.ACCOUNT_LOGIN)
    .switchMap((action: AccountActions.AccountLogin) =>
      this.loginService.login(action.id, action.pass)
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            this.sessionService.refresh();
            return new RouterActions.Go({path: ['/home']})
          } else {
            return new AccountActions.AccountCommonResponse(res.code)
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
            return new AccountActions.AccountCommonResponse(res.code)
          }
        })
    );

  @Effect() join$ = this.actions$
    .ofType(AccountActions.ACCOUNT_JOIN)
    .switchMap((action: AccountActions.AccountJoin) =>
      this.accountService.join(action.user)
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            alert('회원가입이 완료되었습니다.');
            return new RouterActions.Go({path: ['/login']})
          } else {
            return new AccountActions.AccountCommonResponse(res.code)
          }
        })
    );

  @Effect() sendCode$ = this.actions$
    .ofType(AccountActions.ACCOUNT_MOBILE_SEND_CODE)
    .switchMap((action: AccountActions.AccountMobileSendCode) =>
      this.authService
        .mobileSend(action.phone)
        .map((res: IResponse<any>) => {
            if (res.code === RESPONSE_CODE.SUCCESS) {
              alert('인증번호가 전송되었습니다.');
              return new AccountActions.AccountCommonResponse(res.code)
            }
          }
        )
    );

  @Effect() checkCode$ = this.actions$
    .ofType(AccountActions.ACCOUNT_MOBILE_CHECK_CODE)
    .switchMap((action: AccountActions.AccountMobileCheckCode) => {
      return this.authService
        .mobileCheck(action.code)
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            alert('인증번호가 전송되었습니다.');
            return new AccountActions.AccountCommonResponse(res.code)
          }
        })
    });

  @Effect() accountLogout$ = this.actions$
    .ofType(AccountActions.ACCOUNT_LOGOUT)
    .switchMap((action: AccountActions.AccountLogout) => {
      return this.loginService
        .loginDelete()
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            this.sessionService.destory();
            return new RouterActions.Go({path: ['/login']})
          } else {
            return Observable.of({type: 'NO_ACTION'});
          }
        });
    });

  constructor(private actions$: Actions, private authService: AuthService,
              private accountService: AccountService, private loginService: LoginService, private sessionService: SessionService) {
  }
}
