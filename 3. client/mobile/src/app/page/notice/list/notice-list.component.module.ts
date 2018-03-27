import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NoticeListComponent} from "./notice-list.component";

@NgModule({
  declarations: [NoticeListComponent],
  imports: [IonicPageModule.forChild(NoticeListComponent)],
  entryComponents: [NoticeListComponent]
})
export class NoticeListComponentModule {
}
