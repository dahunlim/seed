import {Store} from "@ngrx/store";
import {Injectable, OnDestroy} from "@angular/core";
import {AppStore} from "../../app-store.interface";
import {SessionService} from "../service/session.service";
import * as RouterActions from "../../core/router/router.action";

@Injectable()
export class BasicComponent implements OnDestroy {

  protected subs$: any[] = [];

  constructor(protected store: Store<AppStore>, protected sessionService: SessionService, private isGuarded: boolean) { }

  ngOnDestroy(): void {
    console.log('test');
    this.subs$.forEach(sub$ => sub$.unsubscribe());
  }

  ionViewCanEnter(): Promise<boolean> | boolean {
    if (this.isGuarded) {
      return new Promise((resolve, reject) => {
        const isAuthenticated = this.sessionService.isAuthenticated();
        if (!isAuthenticated) {
          this.sessionService
            .refresh()
            .first()
            .subscribe((isRefreshed: boolean) => {
              if (!isRefreshed) {
                this.sessionService.destory();
                setTimeout(() => {
                  this.store.dispatch(new RouterActions.SetRoot("HomeComponent"));
                });
                reject(false)
              } else {
                resolve(true);
              }
            });
        } else {
          resolve(true);
        }
      });
    } else {
      return true;
    }
  }
}
