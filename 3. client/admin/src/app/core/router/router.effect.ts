import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import * as RouterActions from './router.action';

@Injectable()
export class RouterEffect {
  @Effect({dispatch: false})
  navigate$ = this.actions$
    .ofType(RouterActions.GO)
    .map((action: RouterActions.Go) => action.payload)
    .do(({path, query: queryParams, extras}) => this.router.navigate(path, {queryParams, ...extras}));

  @Effect({dispatch: false})
  navigateBack$ = this.actions$
    .ofType(RouterActions.BACK)
    .do(() => this.location.back());

  @Effect({dispatch: false})
  navigateForward$ = this.actions$
    .ofType(RouterActions.FORWARD)
    .do(() => this.location.forward());

  constructor(private actions$: Actions, private router: Router, private location: Location) {
  }
}
