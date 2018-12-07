import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import * as AuthActions from './action';
import {IResponse, RESPONSE_CODE} from "../../service/response.service";
import {AuthService} from '../../api/auth.service';
import {ToastService} from "../../service/toast.service";

@Injectable()
export class AuthEffect {

  constructor(
    private toastService: ToastService,
    private actions$: Actions,
    private authService: AuthService,
  ) {}

  @Effect() mobileSendCode$ = this.actions$
    .ofType(AuthActions.AUTH_MOBILE_SEND_CODE)
    .switchMap((action: AuthActions.AuthMobileSendCode) => {
        return this.authService
          .mobileSend(action.phone)
          .map((res: IResponse<any>) => {
            if (res.code === RESPONSE_CODE.SUCCESS) {
              this.toastService.presentToast('인증번호 전송');
              return new AuthActions.AuthMobileSendCodeSuccess(true);
            } else {
              this.toastService.presentToast('인증번호 전송실패');
              return {type: 'NO_ACTION'};
            }
          })
      }
    );

  @Effect() mobileCheckCode$ = this.actions$
    .ofType(AuthActions.AUTH_MOBILE_CHECK_CODE)
    .switchMap((action: AuthActions.AuthMobileCheckCode) => {
      return this.authService
        .mobileCheck(action.code)
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            this.toastService.presentToast('인증 성공');
            return new AuthActions.AuthMobileCheckCodeSuccess(true);
          } else {
            if(typeof res.msg !== 'undefined'){
              this.toastService.presentToast('인증실패 재인증해주세요.');
            }else{
              this.toastService.presentToast('인증코드 확인필요');
            }
            return {type: 'NO_ACTION'}
          }
        })
    });
}
