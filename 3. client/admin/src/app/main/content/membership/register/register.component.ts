import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FuseConfigService} from '../../../../core/services/fuse/config.service';
import {fuseAnimations} from '../../../../shared/animation/fuse.animations';
import {User} from '../../../../core/models/user';
import {AppStore} from '../../../../app-store.interface';
import {Store} from '@ngrx/store';
import * as MembershipActions from '../../../../core/redux/membership/membership.action';

@Component({
  selector: 'fuse-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: fuseAnimations
})
export class FuseRegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerFormErrors: any;

  constructor(private fuseConfig: FuseConfigService, private formBuilder: FormBuilder, private store: Store<AppStore>) {

    // Single page configuration
    this.fuseConfig.setSettings({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none'
      }
    });

    this.registerFormErrors = {
      name: {},
      email: {},
      password: {},
      passwordConfirm: {}
    };
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6), confirmPassword]]
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.onRegisterFormValuesChanged();
    });
  }

  onRegisterFormValuesChanged() {
    for (const field in this.registerFormErrors) {
      if (!this.registerFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.registerFormErrors[field] = {};
      // Get the control
      const control = this.registerForm.get(field);
      if (control && control.dirty && !control.valid) {
        this.registerFormErrors[field] = control.errors;
      }
    }
  }

  join() {
    const rawValue = this.registerForm.getRawValue();
    const user = new User(rawValue.email, rawValue.password, rawValue.name);
    this.store.dispatch(new MembershipActions.MembershipRegister(user));
  }
}

function confirmPassword(control: AbstractControl) {
  if (!control.parent || !control) {
    return;
  }
  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if (!password || !passwordConfirm) {
    return;
  }

  if (passwordConfirm.value === '') {
    return;
  }

  if (password.value !== passwordConfirm.value) {
    return {
      passwordsNotMatch: true
    };
  }
}
