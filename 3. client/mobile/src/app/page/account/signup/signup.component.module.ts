import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SignupComponent} from "./signup.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [SignupComponent],
  imports: [
    IonicPageModule.forChild(SignupComponent),
    FormsModule
  ],
  entryComponents: [SignupComponent]
})
export class SignupComponentModule {
}
