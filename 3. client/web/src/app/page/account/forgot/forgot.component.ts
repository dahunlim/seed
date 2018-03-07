import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {AppStore} from '../../../app-store.interface';
import {RESPONSE_CODE} from '../../../core/service/response.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})

export class ForgotComponent implements OnInit, OnDestroy {

  private code: string;
  private pass: string;
  private check: boolean;
  private checkCode: boolean;
  private id: string;
  private confirmPass: string;
  private timerStart: boolean;
  private countTimer: any;
  private timer: number = 180;
  private minute: number = 3;
  private second: number = 0;
  private isAuthenticated: boolean;
  private viewChange: boolean;
  private codeSend$: Observable<any>;
  private codeCheck$: Observable<any>;


  constructor(private store: Store<AppStore>, private router: Router) {
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  sendPassCode() {

  }

  checkPassCode() {


  }

  resetPassword() {

  }

  changeReset() {
    if (this.checkCode) {
      this.viewChange = true;
    } else {
      alert('인증번호를 입력 후 확인해주세요.');
    }
  }

  checkPassword() {
    if (this.pass === this.confirmPass) {
      this.check = true;
    } else {
      this.check = false;
    }
  }
}
