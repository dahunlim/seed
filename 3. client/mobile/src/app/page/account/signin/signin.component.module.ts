import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SigninComponent} from "./signin.component";

@NgModule({
  declarations: [SigninComponent],
  imports: [IonicPageModule.forChild(SigninComponent)],
  entryComponents: [SigninComponent]
})
export class SigninComponentModule {
}
