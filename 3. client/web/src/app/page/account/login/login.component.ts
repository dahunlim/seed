import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Location} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {AppStore} from "../../../app-store.interface";
import * as AccountActions from "../redux/account.action";

import {aramSlideUpDown} from "app/shared/animation";
import {SessionService} from "../../../core/service/session.service";
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

  goToPage(page) {
    switch (page) {
      case "join":
        this.location.go("join");
        break;
      case "find":
        this.location.go("find");
        break;
      default:
    }
  }

  spinner(action: boolean): void {
    if (action) {
      this.spinnerService.start();
    } else {
      this.spinnerService.stop();
    }
  }
}
