import {NgModule} from '@angular/core';
import {AuthRoutingModule} from "./auth-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JoinsComponent} from "./joins/joins.component";
import {LoginsComponent} from "./logins/logins.component";

@NgModule({
  imports: [
    AuthRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    JoinsComponent,
    LoginsComponent
  ]
})
export class AuthModule {
}
