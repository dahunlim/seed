import {NgModule} from '@angular/core';
import {MembershipRoutingModule} from './membership-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {MembershipComponent} from './membership.component';
import {FuseLoginComponent} from './login/login.component';
import {FuseForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {FuseLockComponent} from './lock/lock.component';
import {FuseMailConfirmComponent} from './mail-confirm/mail-confirm.component';
import {FuseRegisterComponent} from './register/register.component';
import {FuseResetPasswordComponent} from './reset-password/reset-password.component';

@NgModule({
  imports: [
    MembershipRoutingModule,
    SharedModule
  ],
  declarations: [
    MembershipComponent,
    FuseForgotPasswordComponent,
    FuseLockComponent,
    FuseLoginComponent,
    FuseMailConfirmComponent,
    FuseRegisterComponent,
    FuseResetPasswordComponent
  ]
})
export class MembershipModule { }
