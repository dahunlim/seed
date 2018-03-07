import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStore} from '../../../app-store.interface';
import * as AccountActions from '../redux/account.action';
import {aramSlideUpDown} from 'app/shared/animation';
import {SessionService} from '../../../core/service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [ aramSlideUpDown ]
})
export class LoginComponent implements OnInit {

  model = {
    id: '',
    pass: ''
  };

  constructor(private store: Store<AppStore>, private sessionService: SessionService) { }

  ngOnInit() {
    this.sessionService.destory();
  }

  login() {
    this.store.dispatch(new AccountActions.AccountLogin(this.model.id, this.model.pass));
  }

}
