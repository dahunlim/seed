import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";
import * as RouterActions from "../../core/router/router.action";
import {Store} from "@ngrx/store";
import {AppStore} from "../../app-store.interface";

@IonicPage({
  name: 'TabsComponent'
})
@Component({
  templateUrl: 'tabs.component.html'
})

export class TabsComponent {

  tab1 = 'HomeComponent';
  tab2 = 'SigninComponent';

  constructor(private store: Store<AppStore>) {
  }

}
