import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {JoinComponent} from './join/join.component';
import {LoginComponent} from './login/login.component';
import {ForgotComponent} from './forgot/forgot.component';

const accountRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'login' },
      { path: 'join', component: JoinComponent },
      { path: 'login', component: LoginComponent},
      { path: 'forgot', component: ForgotComponent}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(accountRoutes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
