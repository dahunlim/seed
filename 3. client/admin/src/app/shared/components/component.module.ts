import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuseConfirmDialogComponent} from './dialog/confirm/confirm-dialog.component';
import {FuseAlertDialogComponent} from './dialog/alert/alert-dialog.component';
import {FuseCountdownComponent} from './countdown/countdown.component';
import {FuseMaterialColorPickerComponent} from './material-color-picker/material-color-picker.component';
import {FuseMatchMedia} from '../../core/services/fuse/match-media.service';
import {FuseNavbarVerticalService} from '../../main/navbar/vertical/navbar-vertical.service';
import {FuseTranslationLoaderService} from '../../core/services/fuse/translation-loader.service';

@NgModule({
  imports: [
  ],
  exports: [
    FuseCountdownComponent,
  ],
  entryComponents: [
    FuseConfirmDialogComponent,
    FuseAlertDialogComponent
  ],
  declarations: [
    FuseConfirmDialogComponent,
    FuseAlertDialogComponent,
    FuseCountdownComponent,
  ],
  providers: [
    FuseMatchMedia,
    FuseNavbarVerticalService,
    FuseTranslationLoaderService
  ],
})
export class ComponentModule {}
