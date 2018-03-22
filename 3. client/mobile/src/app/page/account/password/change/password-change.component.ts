import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {IonicPage, ToastController} from "ionic-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import * as RouterActions from "../../../../core/router/router.action";
import {AppStore} from "../../../../app-store.interface";
import {FormHelper} from "../../../../core/helper/form";
import * as AccountActions from "../../redux/account.action";

@IonicPage({
  name: 'PasswordChangeComponent',
  segment: 'password'
})
@Component({
  selector: 'page-password-change-ionic',
  templateUrl: 'password-change.component.html'
})
export class PasswordChangeComponent {
  private change$: any;
  private passForm: FormGroup;
  private passFormErrors: any;
  constructor(private store: Store<AppStore>, private formBuilder: FormBuilder, private toastCtrl: ToastController) {
    this.passFormErrors = {
      password: {},
      confirmPassword: {}
    };
    this.passForm =  this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {validator: FormHelper.confirmPassword('password', 'confirmPassword')} )
  }

  ionViewDidLoad() {
    this.change$ = FormHelper.formChangeHandler(this.passForm, this.passFormErrors);
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

  reset() {
    const form = this.passForm.getRawValue();
    if(form.password !== form.confirmPassword || !form.password) {
      this.toast('비밀번호를 확인해주세요.');
      return false;
    }

    this.store.dispatch(new AccountActions.AccountForgotResetPassword(form.password));
  }
}
