import {NgModule} from '@angular/core';
import {NoticeRoutingModule} from './notice-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NoticeComponent} from './notice.component';
import {NoticeListComponent} from './list/notice-list.component';
import {NoticeFormComponent} from './form/notice-form.component';
import {NoticeViewComponent} from './view/notice-view.component';
import {NoticeModifyComponent} from './modify/notice-modify.component';

@NgModule({
  imports: [
    SharedModule,
    NoticeRoutingModule
  ],
  declarations: [
    NoticeComponent,
    NoticeListComponent,
    NoticeFormComponent,
    NoticeViewComponent,
    NoticeModifyComponent
  ]
})
export class NoticeModule { }

