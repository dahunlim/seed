import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PasswordSearchComponent} from "./password-search.component";

@NgModule({
  declarations: [PasswordSearchComponent],
  imports: [IonicPageModule.forChild(PasswordSearchComponent)],
  entryComponents: [PasswordSearchComponent]
})
export class PasswordSearchComponentModule {
}
