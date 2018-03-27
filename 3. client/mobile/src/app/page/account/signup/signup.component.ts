import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {IonicPage, ToastController} from "ionic-angular";

import * as RouterActions from "../../../core/router/router.action";
import * as AccountActions from "../redux/account.action";
import {AppStore} from "../../../app-store.interface";
import {User} from "../../../core/model/user";
import {FormHelper} from "../../../core/helper/form";
import {accountAddress, accountMobileCheckCode} from "../redux/account.selector";

@IonicPage({
  name: 'SignupComponent',
  segment: 'signup'
})
@Component({
  selector: 'page-signup-ionic',
  templateUrl: 'signup.component.html',
})
export class SignupComponent {
  private change$: any;
  private userForm: FormGroup;
  private userFormErrors: any;
  private user: User;

  /* Mobile Auth */
  private allowStep: number = 1;

  constructor(private store: Store<AppStore>, private formBuilder: FormBuilder, private toastCtrl: ToastController) {
    this.user = new User();
    this.userFormErrors = {
      id: {},
      pass: {},
      confirmPass: {},
      name: {},
      phone: {},
      code: {},
      postcode: {},
      address1: {},
      address2: {},
    };
    this.userForm = this.formBuilder.group({
      // 1
      id: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', [Validators.required]],
      // 2
      name: [''],
      phone: [''],
      code: [''],
      // 3
      postcode: [{value: '', disabled: true}, [Validators.required]],
      address1: [{value: '', disabled: true}, [Validators.required]],
      address2: ['', [Validators.required]],
    }, {validator: FormHelper.confirmPassword('pass', 'confirmPass')} );
  }

  ionViewDidLoad() {
    this.change$ = FormHelper.formChangeHandler(this.userForm, this.userFormErrors);
  }

  ionViewWillEnter() {
    this.store.select(accountAddress)
      .filter(data => !!data)
      .subscribe(res => {
        this.userForm.patchValue({postcode: res.postcode});
        this.userForm.patchValue({address1: res.address});
    }).unsubscribe();
  }

  ionViewWillUnload() { // 페이지 삭제될때
    this.store.dispatch(new AccountActions.AccountMobileResetCode());
    this.store.dispatch(new AccountActions.AccountAddressResetCode());
  }

  back() {
    this.store.dispatch(new RouterActions.Back());
  }

  findPostcode() {
    this.store.dispatch(new RouterActions.Go('AddressComponent'));
  }

  /* Mobile Auth*/
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

  step1() {
    if(!this.userForm.getRawValue().phone) {
      this.toast('핸드폰번호를 입력해주세요.');
      return false;
    }
    this.store.dispatch(new AccountActions.AccountMobileSendCode(this.userForm.getRawValue().phone));
    this.allowStep = 2
  }

  step2() {
    if(!this.userForm.getRawValue().code) {
      this.toast('인증코드를 입력해주세요.');
      return false;
    }
    // 인증번호 확인
    this.store.dispatch(new AccountActions.AccountMobileCheckCode(this.userForm.getRawValue().code));
    this.store.select(accountMobileCheckCode)
      .filter(data => !!data)
      .subscribe(() => {
        // 성공후
        this.allowStep = 3;
        this.userForm.get('phone').disable();
        this.userForm.get('code').disable();
      }).unsubscribe();
  }

  toast(str: string = '') {
    this.toastCtrl.create({
      message: str,
      duration: 2000,
      position: 'top'
    }).present();
  }

  signup() {
    if(this.allowStep !== 3) {
      this.toast('핸드폰 인증을 완료해주세요.');
      return false;
    }

    const rawValue = this.userForm.getRawValue();
    const user = new User(rawValue.id, rawValue.pass, rawValue.name, rawValue.phone, 'SeedProject', null, rawValue.postcode, rawValue.address1+'^%%_'+rawValue.address2, true, 0, 'SeedProject');
    this.store.dispatch(new AccountActions.AccountSignup(user));
  }
}
