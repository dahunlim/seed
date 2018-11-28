import {Directive, HostListener, Input} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppStore} from "../../app-store.interface";
import * as RouterActions from "../../core/redux/router/action";

@Directive({
  selector: "[routePage]"
})
export class RoutePageDirective {

  @Input() routePage: string;
  @Input() routeData: any = {};
  @Input() routeOption: any = {};

  @HostListener("click") onClick() {
    if (this.routePage === "back") {
      this.store.dispatch(new RouterActions.Back());
    } else {
      this.store.dispatch(new RouterActions.Go({path: [this.routePage], query: this.routeData, extras: this.routeOption}, ));
    }
  }

  constructor(protected store: Store<AppStore>) {
  }
}
