import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SharedModule} from "../../../shared/shared.module";
import {InquiryModifyComponent} from "./inquiry-modify.component";

@NgModule({
  declarations: [InquiryModifyComponent],
  imports: [
    SharedModule,
    IonicPageModule.forChild(InquiryModifyComponent)],
  entryComponents: [InquiryModifyComponent]
})
export class InquiryModifyComponentModule {
}
