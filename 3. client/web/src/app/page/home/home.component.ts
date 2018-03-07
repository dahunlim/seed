import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStore} from '../../app-store.interface';

import {fadeInAnimation} from '../../shared/animation/index';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  animations: [ fadeInAnimation ]
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<AppStore>) { }

  ngOnInit() {
  }
}
