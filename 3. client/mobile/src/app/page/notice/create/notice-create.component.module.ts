import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NoticeCreateComponent} from "./notice-create.component";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  declarations: [NoticeCreateComponent],
  imports: [
    SharedModule,
    IonicPageModule.forChild(NoticeCreateComponent)],
  entryComponents: [NoticeCreateComponent]
})
export class NoticeCreateComponentModule {
}
