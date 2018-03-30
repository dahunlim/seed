import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SharedModule} from "../../../shared/shared.module";
import {InquiryCreateComponent} from "./inquiry-create.component";

@NgModule({
  declarations: [InquiryCreateComponent],
  imports: [
    SharedModule,
    IonicPageModule.forChild(InquiryCreateComponent)],
  entryComponents: [InquiryCreateComponent]
})
export class InquiryCreateComponentModule {
}
