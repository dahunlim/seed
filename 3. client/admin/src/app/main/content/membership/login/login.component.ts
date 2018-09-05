import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FuseConfigService} from '../../../../core/services/fuse/config.service';
import {fuseAnimations} from '../../../../shared/animation/fuse.animations';
import {AppStore} from '../../../../app-store.interface';
import {Store} from '@ngrx/store';

import * as MembershipActions from '../../../../core/redux/membership/membership.action';
import {FormHelper} from '../../../../core/helpers/form';

@Component({
  selector: 'fuse-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: fuseAnimations
})
export class FuseLoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loginFormErrors: any;

  subs$: any[] = [];

  constructor(private fuseConfig: FuseConfigService, private formBuilder: FormBuilder, private store: Store<AppStore>) {
    this.fuseConfig.setSettings({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none'
      }
    });
  }

  ngOnInit() {
    this.loginFormErrors = {
      email: {},
      password: {}
    };
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.subs$.push(FormHelper.formChangeHandler(this.loginForm, this.loginFormErrors));
  }

  ngOnDestroy(): void {
    this.subs$.forEach(sub => sub.unsubscribe());
  }

  login() {
    const rawValue = this.loginForm.getRawValue();
    console.log(rawValue);
    this.store.dispatch(new MembershipActions.MembershipLogin(rawValue.email, rawValue.password));
  }
}
