import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NoticeDetailComponent} from "./notice-detail.component";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  declarations: [NoticeDetailComponent],
  imports: [
    SharedModule,
    IonicPageModule.forChild(NoticeDetailComponent)],
  entryComponents: [NoticeDetailComponent]
})
export class NoticeListComponentModule {
}
