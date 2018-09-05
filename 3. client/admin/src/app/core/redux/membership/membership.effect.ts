import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as MembershipActions from './membership.action';
import * as RouterActions from '../../../core/router/router.action';
import {MatSnackBar} from '@angular/material';
import {IResponse, RESPONSE_CODE} from '../../helpers/response';
import {MembershipApiService} from '../../apis/sign-api.service';
import {SessionService} from '../../services/session.service';
import {JoinApiService} from '../../apis/join-api.service';

@Injectable()
export class MembershipEffect {

  @Effect() MembershipRegister$ = this.membershipActions$
    .ofType(MembershipActions.MEMBERSHIP_REGISTER)
    .switchMap((action: MembershipActions.MembershipRegister) => {
      return this.joinApiService
        .join(action.user)
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            return new RouterActions.Go({path: ['/membership/login']});
          } else {
            this.snackBar.open('Membership Register Failed', 'Dance', {duration: 2000});
            return {type: 'NULL_ACTION'};
          }
        });
    });

  @Effect() MembershipLogin$ = this.membershipActions$
    .ofType(MembershipActions.MEMBERSHIP_LOGIN)
    .switchMap((action: MembershipActions.MembershipLogin) => {
      return this.membershipApi
        .signin(action.email, action.pass)
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            this.sessionService.init(res.data);
            return new RouterActions.Go({path: ['/dashboard']});
          } else if (res.code === RESPONSE_CODE.NOT_INITIALIZED) {
            return new RouterActions.Go({path: [`/membership/reset-password/${res.data.userId}`]});
          } else if (res.code === RESPONSE_CODE.NOT_SIGNED) {
            this.sessionService.init(res.data);
            return new RouterActions.Go({path: [`/membership/sign`]});
          } else {
            this.snackBar.open('Login Failed', 'Dance', {duration: 2000});
            return {type: 'NULL_ACTION'};
          }
        });
    });

  @Effect() MembershipInitialize$ = this.membershipActions$
    .ofType(MembershipActions.MEMBERSHIP_INITIALIZE)
    .switchMap((action: MembershipActions.MembershipInitialize) => {
        return this.membershipApi
          .initialize(action.email, action.oldPass, action.newPass)
          .map((res: IResponse<any>) => {
            if (res.code === RESPONSE_CODE.SUCCESS) {
              this.snackBar.open('Initialize Success!', 'Dance', {duration: 2000});
              return new RouterActions.Go({path: [`/membership/login`]});
            } else {
              this.snackBar.open('Initialize Failed', 'Dance', {duration: 2000});
              return {type: 'NULL_ACTION'};
            }
          });
    });

  @Effect() MembershipLogout$ = this.membershipActions$
    .ofType(MembershipActions.MEMBERSHIP_LOGOUT)
    .switchMap((action: MembershipActions.MembershipLogout) => {
      return this.membershipApi
        .logout()
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            this.sessionService.destory();
            this.snackBar.open('Logout Success', 'Dance', {duration: 2000});
            return new RouterActions.Go({path: ['/membership/login']});
          } else {
            this.snackBar.open('Logout Failed', 'Dance', {duration: 2000});
            return {type: 'NULL_ACTION'};
          }
        });
    });

  constructor(
    private membershipActions$: Actions,
    private membershipApi: MembershipApiService,
    private sessionService: SessionService,
    private joinApiService: JoinApiService,
    private snackBar: MatSnackBar
  ) {}
}
