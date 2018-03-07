import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppStore} from '../../../app-store.interface';
import * as AccountActions from '../redux/account.action';

import {accountResponse} from '../redux/account.selector';
import {aramSlideUpDown} from 'app/shared/animation';
import {RESPONSE_CODE} from '../../../core/service/response.service';
import {User} from '../../../core/model/user';
import {SessionService} from '../../../core/service/session.service';

declare var daum: any;

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
  animations: [aramSlideUpDown]
})
export class JoinComponent implements OnInit {

  private codeSend$: Observable<any>;
  private timerStart: boolean;
  private countTimer: any;
  private timer: number = 180;
  private step: number = 1;
  private check: boolean;
  private codecheck: boolean;
  private model = {
    pass: '',
    confirmPass: '',
    code: '',
    address: '',
    address2: ''
  };
  private user: User;

  constructor(private store: Store<AppStore>, private router: Router, private sessionService: SessionService) {
    this.user = new User('', '', '', '', '', undefined, 0, '', '', 0);
  }

  ngOnInit() {
    this.sessionService.destory();
    this.codeSend$ = this.store.select(accountResponse);
    this.codeSend$.subscribe(rs => {
      switch (rs) {
        case RESPONSE_CODE.SUCCESS:
          this.timerStart = true;
          this.countTimer = setInterval(() => {
            this.timer = this.timer - 1;
            if (this.timer === 0) {
              clearInterval(this.countTimer);
            }
          }, 1000);
          break;
      }
    });

    this.store.select(accountResponse).subscribe(rs => {
      switch (rs) {
        case RESPONSE_CODE.SUCCESS:
          this.codecheck = true;
          break;
      }
    });
  }

  /** 페이지 이동 **/
  setStep(num: number) {
    this.step = num;
  }

  isStep(num: number) {
    return this.step === num;
  }

  /** 다음 우편찾기 기능 **/
  postcodeClick() {
    new daum.Postcode({
      oncomplete: (data) => this.setDaumAddressApi(data),
    }).open();
  }

  setDaumAddressApi(data) {
    this.user.postcode = data.zonecode;
    this.model.address = data.address;
  }

  /** 핸드폰번호를 통해 인증번호 받기 Account reducer**/
  sendMobileCode() {
    this.store.dispatch(new AccountActions.AccountMobileSendCode(this.user.phone));
  }

  /** 전송받은 인증번호 체크 (Account reducer)**/
  checkMobileCode() {
    this.store.dispatch(new AccountActions.AccountMobileCheckCode(this.model.code));
  }

  /** Join API (join reducer)**/
  join() {
    this.user.address = `${this.model.address} / ${this.model.address2}`;
    this.store.dispatch(new AccountActions.AccountJoin(this.user));
  }

  confirmPassword() {
    if (this.model.pass === this.model.confirmPass) {
      this.user.pass = this.model.pass;
      this.check = true;
    } else {
      this.check = false;
    }
  }

  nextPage() {
    if (this.codecheck) {
      this.setStep(3);
    } else {
      alert('인증번호를 확인해주세요.');
    }
  }
}
