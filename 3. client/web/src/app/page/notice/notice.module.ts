import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NoticeComponent} from "./notice.component";
import {NoticeListComponent} from "./list/notice-list.component";
import {NoticeDetailComponent} from "./detail/notice-detail.component";
import {NoticeFormComponent} from "./form/notice-form.component";
import {NoticeCreateComponent} from './create/notice-create.component';

import {NoticeRoutingModule} from "./notice-routing.module";

import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    NoticeRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    NoticeComponent,
    NoticeListComponent,
    NoticeDetailComponent,
    NoticeFormComponent,
    NoticeCreateComponent
  ],
  providers: []
})
export class NoticeModule {

}
