import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";
import {Store} from "@ngrx/store";

import {AppStore} from "../../app-store.interface";

@IonicPage({
  name: 'HomeComponent',
  segment: 'home'
})
@Component({
  selector: 'page-home-ionic',
  templateUrl: 'home.component.html'
})

export class HomeComponent {
  constructor(protected store: Store<AppStore>) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
  }

  ionViewWillLeave() {
  }
}
