import * as RouterActions from '../core/redux/router/action';
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

  goToPage(str: string) {
    switch (str) {
      case 'home' :
        this.store.dispatch(new RouterActions.Go({path: ['/main/']}));
        break;
      case 'notice' :
        this.store.dispatch(new RouterActions.Go({path: ['/main/notice']}));
        break;
      case 'Inquiry' :
        this.store.dispatch(new RouterActions.Go({path: ['/main/inquiry']}));
        break;
      default :
        break;
    }
  }
}
