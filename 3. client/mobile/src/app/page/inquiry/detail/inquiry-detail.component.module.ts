import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SharedModule} from "../../../shared/shared.module";
import {InquiryDetailComponent} from "./inquiry-detail.component";

@NgModule({
  declarations: [InquiryDetailComponent],
  imports: [
    SharedModule,
    IonicPageModule.forChild(InquiryDetailComponent)],
  entryComponents: [InquiryDetailComponent]
})
export class InquiryDetailComponentModule{
}
