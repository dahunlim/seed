import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {IResponse, RESPONSE_CODE} from '../../../../core/helpers/response';

import * as UserActions from './user.action';
import * as RouterActions from '../../../../core/router/router.action';
import {Converter} from '../../../../core/helpers/converter';
import {UserApiService} from '../../../../core/apis/user-api.service';
import {User} from '../../../../core/models/user';

@Injectable()
export class UserEffect {

  @Effect() UserCreate$ = this.userActions$
    .ofType(UserActions.USER_CREATE)
    .switchMap((action: UserActions.UserCreate) => {
      return this.userApiService
        .post(action.user)
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            return new RouterActions.Go({path: ['/user/list']});
          } else {
            return {type: 'NULL_ACTION'};
          }
        });
    });

  @Effect() UserGetList$ = this.userActions$
    .ofType(UserActions.USER_GET_LIST)
    .switchMap((action: UserActions.UserGetList) => {
      return this.userApiService
        .list(action.offset, action.count, action.keyword)
        .map((res: IResponse<User[]>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            const users: User[] = Converter.jsonToInstance<User>(User, res.data.list);
            return new UserActions.UserGetListSuccess(res.data.total, users);
          } else {
            return {type: 'NULL_ACTION'};
          }
        });
    });

  @Effect() UserModify$ = this.userActions$
    .ofType(UserActions.USER_MODIFY)
    .switchMap((action: UserActions.UserModify) => {
      return this.userApiService
        .modify(action.user)
        .map((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            return new RouterActions.Back();
          } else {
            return {type: 'NULL_ACTION'};
          }
        });
    });

  constructor(private userActions$: Actions, private userApiService: UserApiService) {
  }
}
