import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AppStore} from '../../../app-store.interface';
import {AuthService} from '../../../core/api/auth.service';
import {RESPONSE_CODE} from '../../../core/service/response.service';
import {DialogService} from '../../../core/service/dialog.service';
import {FormHelper} from '../../../core/helper/form';

import * as AccountActions from '../../../core/redux/account/action';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})

export class ForgotComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean;
  countTimer: any;
  timerStart: boolean;
  timer: number = 180;

  checkCode: boolean;
  change$: any;

  id: string;
  code: string;
  pass: string;
  passConfirm: string;

  viewChange: boolean;

  forgotFormErrors: any;
  forgotForm: FormGroup;

  constructor(private authService: AuthService, private dialog: DialogService, private formBuilder: FormBuilder, private store: Store<AppStore>) {
    this.forgotFormErrors = {
      pass: {},
      passConfirm: {}
    };

    this.forgotForm = this.formBuilder.group({
      pass: ['', [Validators.required, Validators.minLength(6)]],
      passConfirm: ['', Validators.required]
    }, {validator: FormHelper.confirmPassword('pass', 'passConfirm')});
  }

  ngOnInit() {
    this.change$ = FormHelper.formChangeHandler(this.forgotForm, this.forgotFormErrors);
  }

  ngOnDestroy() {

  }

  authcode(type) {
    switch (type) {
      case 'send':
        this.isAuthenticated = true;
        this.authService.mobileSend(this.id).subscribe(
          data => {
            switch (data.code) {
              case RESPONSE_CODE.SUCCESS:
                this.dialog.alert('인증번호가 전송되었습니다.');
                this.timerStart = true;
                this.countTimer = setInterval(() => {
                  this.timer = this.timer - 1;
                  if (this.timer === 0) {
                    clearInterval(this.countTimer);
                  }
                }, 1000);
                break;
              default:
                this.checkCode = false;
            }
          });
        break;
      case 'confirm' :
        this.authService.mobileCheck(this.code).subscribe(
          data => {
            switch (data.code) {
              case RESPONSE_CODE.SUCCESS:
                this.dialog.alert('인증번호가 확인되었습니다.');
                this.checkCode = true;
                break;
              default:
                this.checkCode = false;
            }
          });
    }
  }

  changeReset() {
    if (this.checkCode) {
      this.viewChange = true;
    } else {
      alert('인증번호 입력 후 확인버튼을 눌러주세요.');
    }
  }

  resetPassword() {
    if (this.forgotForm.valid) {
      this.store.dispatch(new AccountActions.AccountResetPw(this.pass));
    }
  }
}
