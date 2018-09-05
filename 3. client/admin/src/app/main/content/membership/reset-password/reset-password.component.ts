import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FuseConfigService} from '../../../../core/services/fuse/config.service';
import {fuseAnimations} from '../../../../shared/animation/fuse.animations';
import {FormHelper} from '../../../../core/helpers/form';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppStore} from '../../../../app-store.interface';

import * as MembershipActions from '../../../../core/redux/membership/membership.action';

@Component({
  selector: 'fuse-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: fuseAnimations
})
export class FuseResetPasswordComponent implements OnInit, OnDestroy {
  resetPasswordForm: FormGroup;
  resetPasswordFormErrors: any;
  subs$: any[] = [];

  constructor(
    private store: Store<AppStore>,
    private fuseConfig: FuseConfigService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.fuseConfig.setSettings({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none'
      }
    });
  }

  ngOnInit() {
    this.resetPasswordFormErrors = {
      email: {},
      password: {},
      newPassword: {},
      newPasswordConfirm: {}
    };

    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordConfirm: ['', [Validators.required, FormHelper.confirmPassword(this.resetPasswordFormErrors, 'newPassword')]]
    });

    this.subs$.push(FormHelper.formChangeHandler(this.resetPasswordForm, this.resetPasswordFormErrors));
    this.subs$.push(this.route.params.subscribe(params => {
      if (params.user_id) {
        this.resetPasswordForm.controls['email'].setValue(params.user_id);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs$.forEach(sub => sub.unsubscribe());
  }

  reset(): void {
    const raw = this.resetPasswordForm.getRawValue();
    this.store.dispatch(new MembershipActions.MembershipInitialize(raw.email, raw.password, raw.newPassword));
  }
}
