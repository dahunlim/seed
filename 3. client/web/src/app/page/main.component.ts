import * as RouterActions from '../core/router/router.action';
import { Component } from '@angular/core';
import {AppStore} from '../app-store.interface';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})

export class MainComponent {
  constructor(private store: Store<AppStore>) { }

  test() {
    this.store.dispatch(new RouterActions.Go({path: ['/notice']}));
  }
}
