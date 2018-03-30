import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {InquiryListComponent} from "./inquiry-list.component";

@NgModule({
  declarations: [InquiryListComponent],
  imports: [IonicPageModule.forChild(InquiryListComponent)],
  entryComponents: [InquiryListComponent]
})
export class InquiryListComponentModule { }
