import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {IonicPage, LoadingController, ToastController} from "ionic-angular";

import * as RouterActions from "../../../../core/router/router.action";
import {AppStore} from "../../../../app-store.interface";
import * as AccountActions from "../../redux/account.action";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormHelper} from "../../../../core/helper/form";
import {aramSlideUpDown} from "../../../../../shared/animation";
import {accountSearchPasswordCode} from "../../redux/account.selector";

@IonicPage({
  name: 'PasswordSearchComponent',
  segment: 'password/search'
})
@Component({
  selector: 'page-password-search-ionic',
  templateUrl: 'password-search.component.html',
  animations: [aramSlideUpDown]
})
export class PasswordSearchComponent {
  private searchForm: FormGroup;
  private searchFormErrors: any;
  private change$: any;

  /* Mobile Auth */
  private allowStep: number = 1;
  private authCheck$: any;
  private limitTime: number = 180;
  private authInterval: any;

  constructor(private store: Store<AppStore>, private formBuilder: FormBuilder, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
    this.searchFormErrors = {
      id: {},
      code: {}
    };
    this.searchForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.email]],
      code: ['']
    })
  }

  ionViewDidLoad() {
    this.change$ = FormHelper.formChangeHandler(this.searchForm, this.searchFormErrors);
  }

  ionViewWillLeave() {
    this.store.dispatch(new AccountActions.AccountPasswordResetCode());
  }

  toast(msg: string = 'null', position: string = 'top') {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: position
    }).present();
  }

  back() {
    this.store.dispatch(new RouterActions.Back());
  }

  authBtn(): string {
    let str = '';
    switch (this.allowStep) {
      case 1: str = '인증번호 받기';
        break;
      case 2: str = '인증번호 확인';
        break;
      case 3: str = '인증완료';
        break;
    }
    return str
  }

  sendPassCode() {
    switch (this.allowStep) {
      case 1:
        this.step1();
        break;
      case 2:
        this.step2();
        break;
      default:
        break;
    }
  }

  flowTime(bol: boolean) {
    if(bol) {
      this.authInterval = setInterval(() => {
        if(this.limitTime > 0) {
          this.limitTime = this.limitTime - 1;
        } else {
          this.toast('인증시간이 만료되었습니다.');
          this.allowStep = 1;
          clearInterval(this.authInterval);
        }
      }, 1000)
    } else {
      clearInterval(this.authInterval);
    }
  }

  step1() {
    if (this.searchForm.getRawValue().id === undefined || this.searchForm.getRawValue().id === '') {
      this.toast('아이디를 입력해주세요.');
      return false;
    }
    this.store.dispatch(new AccountActions.AccountPasswordSendCode(this.searchForm.getRawValue().id));
    this.loadingCtrl.create({
      content: "잠시만 기다려주세요",
      duration: 500
    }).present();

    setTimeout(() => {
      this.allowStep = 2;
      this.limitTime = 180;
      this.flowTime(true);
    }, 2000);
  }

  step2() {
    if(!this.searchForm.getRawValue().code) {
      this.toast('인증코드를 입력해주세요.');
      return false;
    }
    this.store.dispatch(new AccountActions.AccountPasswordCheckCode(this.searchForm.getRawValue().code));
    this.authCheck$ = this.store.select(accountSearchPasswordCode).subscribe(res => {
      if(res) {
        this.allowStep = 3;
        this.flowTime(false);
        this.authCheck$.unsubscribe();
      }
    });
  }

  passReset() {
    if(this.allowStep !== 3) {
      this.toast('인증을 완료해주세요.');
      return false;
    }
    this.store.dispatch(new RouterActions.Go('PasswordChangeComponent'));
  }
}
