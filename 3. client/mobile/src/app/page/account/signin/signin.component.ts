import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";
import * as RouterActions from "../../../core/router/router.action";
import * as AccountActions from "../redux/account.action";
import {AppStore} from "../../../app-store.interface";
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormHelper} from "../../../core/helper/form";
import {aramSlideUpDown} from "../../../../shared/animation";
import {SessionService} from "../../../core/service/session.service";

@IonicPage({
  name: 'SigninComponent',
  segment: 'signin'
})
@Component({
  selector: 'page-signin-ionic',
  templateUrl: 'signin.component.html',
  animations: [aramSlideUpDown]
})
export class SigninComponent {
  private change$: any;
  private loginForm: FormGroup;
  private loginFormErrors: any;

  constructor(private store: Store<AppStore>, private formBuilder: FormBuilder, private sessionService: SessionService) {
    this.sessionService.destory();
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

  goToPage(str: string) {
    switch (str) {
      case 'signup':
        this.store.dispatch(new RouterActions.Go('SignupComponent'));
        break;
      case 'password':
        this.store.dispatch(new RouterActions.Go('PasswordSearchComponent'));
        break;
      default :
        alert('확인이 필요한 값 : ' + str);
    }
  }

  login(){
    const login = this.loginForm.getRawValue();
    this.store.dispatch(new AccountActions.AccountLogin(login.id, login.password));
  }
}
