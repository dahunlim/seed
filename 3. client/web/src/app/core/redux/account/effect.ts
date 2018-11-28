import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap} from "rxjs/operators";

import * as AccountActions from './action';
import * as RouterActions from '../router/action';
import {AuthService} from '../../api/auth.service';
import {AccountService} from '../../api/account.service';
import {LoginService} from '../../api/login.service';
import {SessionService} from '../../service/session.service';
import {IResponse, RESPONSE_CODE} from '../../service/response.service';
import {DialogService} from 'app/core/service/dialog.service';

@Injectable()
export class AccountEffect {

  @Effect() login$ = this.actions$.pipe(
    ofType(AccountActions.ACCOUNT_LOGIN),
    switchMap((action: AccountActions.AccountLogin) =>
      this.loginService.login(action.id, action.pass)
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            this.sessionService.refresh();
            return new RouterActions.Go({path: ['/home']})
          } else {
            return {type: 'NO_ACTION'};
          }
        })
    )
  );

  @Effect() join$ = this.actions$.pipe(
    ofType(AccountActions.ACCOUNT_JOIN),
    switchMap((action: AccountActions.AccountJoin) =>
      this.accountService.join(action.join)
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            this.dialog.alert('회원가입에 성공하였습니다.', 'login');
            return {type: 'NO_ACTION'};
          } else {
            return {type: 'NO_ACTION'};
          }
        })
    )
  );

  @Effect() resetPw$ = this.actions$.pipe(
    ofType(AccountActions.ACCOUNT_RESET_PW),
    switchMap((action: AccountActions.AccountResetPw) =>
      this.authService.resetPassword(action.pass)
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            this.dialog.alert('비밀번호가 변경되었습니다.', 'login');
            return {type: 'NO_ACTION'};
          } else {
            return {type: 'NO_ACTION'};
          }
        })
    )
  );

  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private authService: AuthService,
    private loginService: LoginService,
    private sessionService: SessionService,
    private dialog: DialogService
  ) { }
}
