import {NgModule} from '@angular/core';
import {JoinComponent} from './join/join.component';
import {LoginComponent} from 'app/page/account/login/login.component';
import {ForgotComponent} from './forgot/forgot.component';
import {AccountComponent} from "./account.component";
import {AccountRoutingModule} from "./account-routing.module";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    AccountRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    AccountComponent,
    JoinComponent,
    LoginComponent,
    ForgotComponent
  ],
})
export class AccountModule {}
