import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Location} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {AppStore} from "../../../app-store.interface";
import * as AccountActions from "../../../core/redux/account/action";
import * as RouterActions from "../../../core/redux/router/action";

import {FormHelper} from "../../../core/helper/form";
import {SpinnerService} from "../../../core/module/spinner/spinner.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  change$: any;

  loginFormErrors: any;
  loginForm: FormGroup;

  id: string;
  pass: string;

  constructor(private formBuilder: FormBuilder,
              private store: Store<AppStore>,
              private location: Location,
              private spinnerService: SpinnerService) {
    this.loginFormErrors = {
      id: {},
      pass: {},
      name: {},
      phone: {}
    };

    this.loginForm = this.formBuilder.group({
      id: ["", [Validators.required]],
      pass: ["", [Validators.required, Validators.minLength(6)]],
      name: ["", [Validators.required]],
      phone: ["", [Validators.required]],
    });
  }

  ngOnInit() {
    this.change$ = FormHelper.formChangeHandler(this.loginForm, this.loginFormErrors);
  }

  login() {
    this.store.dispatch(new AccountActions.AccountLogin(this.id, this.pass));
  }

  spinner(action: boolean): void {
    if (action) {
      this.spinnerService.start();
    } else {
      this.spinnerService.stop();
    }
  }
}
