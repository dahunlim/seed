import {App} from "ionic-angular";
import {Injectable} from "@angular/core";
import {Effect, Actions} from "@ngrx/effects";
import * as RouterActions from "./router.action";

@Injectable()
export class RouterEffect {
  constructor(private actions$: Actions, private app: App) { }

  @Effect({dispatch: false})
  navigateSetRoot$ = this.actions$
    .ofType(RouterActions.SETROOT)
    .do(async (action: RouterActions.SetRoot) => {
      await this.app.getRootNav().setRoot(action.pageName);
    });

  @Effect({dispatch: false})
  navigateGo$ = this.actions$
    .ofType(RouterActions.GO)
    .do((action: RouterActions.Go) => {
      this.app.getRootNav().push(action.pageName, action.data);
    });


  @Effect({dispatch: false})
  navigateHome$ = this.actions$
    .ofType(RouterActions.HOME)
    .do((action: RouterActions.Home) => {
      this.app.getRootNav().getActiveChildNav().select(0);
      setTimeout(() => {
        this.app.getRootNav().goToRoot();
      }, 50);
    });

  @Effect({dispatch: false})
  navigateBack$ = this.actions$
    .ofType(RouterActions.BACK)
    .do(() => {
      this.app.navPop();
    });

  @Effect({dispatch: false})
  navigateForward$ = this.actions$
    .ofType(RouterActions.FORWARD)
    .do(() => {

    });
}
