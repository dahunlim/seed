import {NgModule} from '@angular/core';
import {JoinComponent} from './join/join.component';
import {LoginComponent} from 'app/page/account/login/login.component';
import {ForgotComponent} from './forgot/forgot.component';

@NgModule({
  imports: [],
  declarations: [
    JoinComponent,
    LoginComponent,
    ForgotComponent
  ],
})
export class AccountModule {}
