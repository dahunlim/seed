import {RouterModule, Routes} from '@angular/router';
import {FuseLoginComponent} from './login/login.component';
import {FuseRegisterComponent} from './register/register.component';
import {FuseMailConfirmComponent} from './mail-confirm/mail-confirm.component';
import {FuseForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {FuseResetPasswordComponent} from './reset-password/reset-password.component';
import {FuseLockComponent} from './lock/lock.component';
import {NgModule} from '@angular/core';

const membershipRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: FuseLoginComponent
      },
      {
        path: 'register',
        component: FuseRegisterComponent
      },
      {
        path: 'mail-confirm',
        component: FuseMailConfirmComponent
      },
      {
        path: 'forgot-password',
        component: FuseForgotPasswordComponent
      },
      {
        path: 'reset-password/:user_id',
        component: FuseResetPasswordComponent
      },
      {
        path: 'lock',
        component: FuseLockComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(membershipRoutes)],
  exports: [RouterModule]
})
export class MembershipRoutingModule { }

