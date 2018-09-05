import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {MaterialModule} from './material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ColorPickerModule} from 'ngx-color-picker';
import {NgxDnDModule} from '@swimlane/ngx-dnd';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {FusePipesModule} from './pipes/pipes.module';
import {FuseConfirmDialogComponent} from '../core/components/dialog/confirm/confirm-dialog.component';
import {FuseAlertDialogComponent} from '../core/components/dialog/alert/alert-dialog.component';
import {FuseCountdownComponent} from '../core/components/countdown/countdown.component';
import {FuseMatchMedia} from '../core/services/match-media.service';
import {FuseNavbarVerticalService} from '../main/navbar/vertical/navbar-vertical.service';
import {FuseMaterialColorPickerComponent} from '../core/components/material-color-picker/material-color-picker.component';
import {FuseTranslationLoaderService} from '../core/services/translation-loader.service';
import {CookieService} from 'ngx-cookie-service';
import {MarkdownModule} from 'angular2-markdown';
import {TranslateModule} from '@ngx-translate/core';
import {SignaturePadModule} from 'angular2-signaturepad';
import {DirectiveModule} from './directives/directive.module';


@NgModule({
  declarations: [
    FuseConfirmDialogComponent,
    FuseAlertDialogComponent,
    FuseCountdownComponent,
    FuseMaterialColorPickerComponent,
  ],
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    FusePipesModule,
    ReactiveFormsModule,
    ColorPickerModule,
    NgxDnDModule,
    NgxDatatableModule,
    MarkdownModule,
    SignaturePadModule,
    DirectiveModule
  ],
  exports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    FusePipesModule,
    FuseCountdownComponent,
    ReactiveFormsModule,
    ColorPickerModule,
    NgxDnDModule,
    NgxDatatableModule,
    FuseMaterialColorPickerComponent,
    MarkdownModule,
    TranslateModule,
    SignaturePadModule,
    DirectiveModule
  ],
  entryComponents: [
    FuseConfirmDialogComponent,
    FuseAlertDialogComponent
  ],
  providers: [
    CookieService,
    FuseMatchMedia,
    FuseNavbarVerticalService,
    FuseTranslationLoaderService
  ]
})

export class SharedModule {

}
