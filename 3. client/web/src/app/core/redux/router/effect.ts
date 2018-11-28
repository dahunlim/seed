import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {Params, Router} from '@angular/router';
import {Location} from '@angular/common';

import * as RouterActions from './action';
import {SpinnerService} from "../../module/spinner/spinner.service";
import {map} from "rxjs/operators";

@Injectable()
export class RouterEffect {

  @Effect({dispatch: false})
  navigate$ = this.actions$.pipe(
    ofType(RouterActions.GO),
    map((action: RouterActions.Go) => {
      this.spinnerService.stop();
      const extras = (action.payload.extras) ? action.payload.extras : {};
      extras['queryParams'] = action.payload.query as Params;
      return this.router.navigate(action.payload.path, action.payload.extras);
    })
  );

  @Effect({dispatch: false})
  navigateBack$ = this.actions$.pipe(
    ofType(RouterActions.BACK),
    map(() => {
      return this.location.back();
    })
  );

  @Effect({dispatch: false})
  navigateForward$ = this.actions$.pipe(
    ofType(RouterActions.FORWARD),
    map(() => this.location.forward())
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private spinnerService: SpinnerService
  ) { }
}
