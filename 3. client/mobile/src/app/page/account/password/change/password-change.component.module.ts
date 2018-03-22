import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PasswordChangeComponent} from "./password-change.component";

@NgModule({
  declarations: [PasswordChangeComponent],
  imports: [IonicPageModule.forChild(PasswordChangeComponent)],
  entryComponents: [PasswordChangeComponent]
})
export class PasswordChangeComponentModule {
}
