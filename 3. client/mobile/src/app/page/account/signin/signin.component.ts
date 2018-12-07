import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";

import {AppStore} from "../../../app-store.interface";
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormHelper} from "../../../core/helper/form";
import {SessionService} from "../../../core/service/session.service";

import * as AccountActions from "../../../core/redux/account/action";
import {BasicComponent} from "../../../core/basic/basic.component";

@IonicPage({
  name: 'SigninComponent',
  segment: 'signin'
})
@Component({
  selector: 'page-signin-ionic',
  templateUrl: 'signin.component.html'
})
export class SigninComponent extends BasicComponent{
  private change$: any;
  private loginForm: FormGroup;
  private loginFormErrors: any;

  constructor(
    protected store: Store<AppStore>,
    protected session: SessionService,
    private formBuilder: FormBuilder,
  ) {
    super(store, session, false);
    this.loginFormErrors = {
      id: {},
      password: {}
    };
    this.loginForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  ionViewDidLoad() {
    this.change$ = FormHelper.formChangeHandler(this.loginForm, this.loginFormErrors);
  }

  login(){
    const login = this.loginForm.getRawValue();
    this.store.dispatch(new AccountActions.AccountLogin(login.id, login.password));
  }
}
