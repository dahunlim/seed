import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PasswordSearchComponent} from "./password-search.component";
import {SharedModule} from "../../../../../shared/shared.module";

@NgModule({
  declarations: [PasswordSearchComponent],
  imports: [SharedModule, IonicPageModule.forChild(PasswordSearchComponent)],
  entryComponents: [PasswordSearchComponent]
})
export class PasswordSearchComponentModule {
}
