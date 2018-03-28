import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NoticeModifyComponent} from "./notice-modify.component";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  declarations: [NoticeModifyComponent],
  imports: [
    SharedModule,
    IonicPageModule.forChild(NoticeModifyComponent)],
  entryComponents: [NoticeModifyComponent]
})
export class NoticeListComponentModule {
}
