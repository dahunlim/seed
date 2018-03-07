import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {InquiryComponent} from "./inquiry.component";
import {InquiryListComponent} from "./list/inquiry-list.component";
import {InquiryDetailComponent} from "./detail/inquiry-detail.component";
import {InquiryFormComponent} from "./form/inquiry-form.component";
import {InquiryCreateComponent} from "./create/inquiry-create.component";
import { InquiryReplyComponent } from './reply/inquiry-reply.component';

const inquiryRoutes: Routes = [
  {
    path: '',
    component: InquiryComponent,
    children: [
      { path: 'list/:pageNumber', component: InquiryListComponent },
      { path: 'detail/:inquiryID', component: InquiryDetailComponent },
      { path: 'form/:inquiryID', component: InquiryFormComponent },
      { path: 'reply/:inquiryID', component: InquiryReplyComponent },
      { path: 'create', component: InquiryCreateComponent },
      { path: '**', redirectTo: 'list/1' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(inquiryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class InquiryRoutingModule {}
