import {Component, OnInit} from '@angular/core';
import {AppStore} from '../../../app-store.interface';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import * as AccountActions from '../redux/account.action';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {

  private pass: string;
  private confirmPass: string;
  private check: any;

  constructor() {
  }

  checkPassword() {
    if (this.pass === this.confirmPass) {
      this.check = true;
    } else {
      this.check = false;
    }
  }


  ngOnInit() {
  }

}
