import {NgModule} from '@angular/core';
import {AppDialogAlertComponent} from './alert/alert.component';
import {AppDialogConfirmComponent} from './confirm/confirm.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    AppDialogAlertComponent,
    AppDialogConfirmComponent
  ],
  entryComponents: [
    AppDialogAlertComponent,
    AppDialogConfirmComponent
  ]
})
export class DialogModule {}
