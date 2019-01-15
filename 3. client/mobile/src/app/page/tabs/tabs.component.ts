import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";
import {Store} from "@ngrx/store";

import {AppStore} from "../../app-store.interface";
import {BasicComponent} from "../../core/basic/basic.component";
import {SessionService} from "../../core/service/session.service";

@IonicPage({
  name: 'TabsComponent',
  segment: 'tabs'
})
@Component({
  templateUrl: 'tabs.component.html'
})

export class TabsComponent extends BasicComponent{

  tab1 = 'HomeComponent';
  tab2 = 'SigninComponent';
  tab3 = '';

  constructor(
    protected store: Store<AppStore>,
    protected session: SessionService
  ) {
    super(store, session, false);
  }

}
