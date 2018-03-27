import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NoticeDetailComponent} from "./notice-detail.component";

@NgModule({
  declarations: [NoticeDetailComponent],
  imports: [IonicPageModule.forChild(NoticeDetailComponent)],
  entryComponents: [NoticeDetailComponent]
})
export class NoticeListComponentModule {
}
