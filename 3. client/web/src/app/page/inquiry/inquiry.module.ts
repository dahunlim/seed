import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import {InquiryComponent} from "./inquiry.component";
import {InquiryListComponent} from "./list/inquiry-list.component";
import {InquiryDetailComponent} from "./detail/inquiry-detail.component";
import { InquiryCreateComponent } from './create/inquiry-create.component';
import {InquiryFormComponent} from "./form/inquiry-form.component";
import {InquiryRoutingModule} from "./inquiry-routing.module";
import { InquiryReplyComponent } from './reply/inquiry-reply.component';

import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    InquiryRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    InquiryComponent,
    InquiryListComponent,
    InquiryFormComponent,
    InquiryDetailComponent,
    InquiryCreateComponent,
    InquiryReplyComponent,
  ],
  providers: []
})
export class InquiryModule { }
