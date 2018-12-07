import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import * as UserActions from './action';
import * as AccountActions from '../../redux/account/action';
import * as RouterActions from '../../router/router.action';

import {IResponse, RESPONSE_CODE} from "../../service/response.service";
import {ToastService} from "../../service/toast.service";
import {UserService} from "../../api/user.service";
import {SessionService} from "../../service/session.service";

@Injectable()
export class UserEffect {

  constructor(
    private toastService: ToastService,
    private actions$: Actions,
    private userService: UserService,
    private sessionService: SessionService
  ) {}

  @Effect() userModifyMe$ = this.actions$
    .ofType(UserActions.USER_MODIFY_ME)
    .switchMap((action: UserActions.UserModifyMe) => {
      return this.userService.modifyMe(action.user)
        .map((res:IResponse<any>) => {
            if(res.code === RESPONSE_CODE.SUCCESS){
              this.toastService.presentToast('수정 완료');
              return new AccountActions.AccountGetLogined();
            }else{
              return {type: 'NO_ACTION'}
            }
          }
        )
    });

  @Effect() userExist$ = this.actions$
    .ofType(UserActions.USER_EXIST)
    .switchMap((action: UserActions.UserExist) => {
      return this.userService.exist(action.user_id)
        .map((res:IResponse<any>) => {
            if(res.code === RESPONSE_CODE.SUCCESS){
              return new UserActions.UserExistSuccess(true);
            }else{
              this.toastService.presentToast('중복된 아이디입니다.');
              return new UserActions.UserExistSuccess(false);
            }
          }
        )
    });

  @Effect() userDelete$ = this.actions$
    .ofType(UserActions.USER_DELETE)
    .switchMap((action: UserActions.UserDelete) => {
      return this.userService.deleteMe()
        .map((res:IResponse<any>) => {
            if(res.code === RESPONSE_CODE.SUCCESS){
              this.toastService.presentToast('탈퇴가 완료되었습니다.');
              this.sessionService.destory();
              return new RouterActions.SetRoot('HomeComponent');
            }else{
              return {type: 'NO_ACTION'}
            }
          }
        )
    });
}
