import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SignupComponent} from "./signup.component";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  declarations: [SignupComponent],
  imports: [
    SharedModule,
    IonicPageModule.forChild(SignupComponent),
    FormsModule
  ],
  entryComponents: [SignupComponent]
})
export class SignupComponentModule {
}
