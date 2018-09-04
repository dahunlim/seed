import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ColorPickerModule} from 'ngx-color-picker';
import {NgxDnDModule} from '@swimlane/ngx-dnd';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {FuseMatSidenavHelperDirective, FuseMatSidenavTogglerDirective} from '../directives/fuse-mat-sidenav-helper/fuse-mat-sidenav-helper.directive';
import {FuseMatSidenavHelperService} from '../directives/fuse-mat-sidenav-helper/fuse-mat-sidenav-helper.service';
import {FusePipesModule} from '../pipes/pipes.module';
import {FuseConfirmDialogComponent} from '../components/dialog/confirm/confirm-dialog.component';
import {FuseAlertDialogComponent} from '../components/dialog/alert/alert-dialog.component';
import {FuseCountdownComponent} from '../components/countdown/countdown.component';
import {FuseMatchMedia} from '../services/match-media.service';
import {FuseNavbarVerticalService} from '../../main/navbar/vertical/navbar-vertical.service';
import {FusePerfectScrollbarDirective} from '../directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import {FuseIfOnDomDirective} from '../directives/fuse-if-on-dom/fuse-if-on-dom.directive';
import {FuseMaterialColorPickerComponent} from '../components/material-color-picker/material-color-picker.component';
import {FuseTranslationLoaderService} from '../services/translation-loader.service';
import {CookieService} from 'ngx-cookie-service';
import {MarkdownModule} from 'angular2-markdown';
import {TranslateModule} from '@ngx-translate/core';
import {AwsSrcDirective} from '../directives/aws-src/aws-src.directive';
import {SignaturePadModule} from 'angular2-signaturepad';
import {AwsProfileDirective} from '../directives/aws-src/aws-profile.directive';
import {GrantIfDirective} from '../directives/grant-if/grant-if.directive';


@NgModule({
  declarations: [
    FuseMatSidenavHelperDirective,
    FuseMatSidenavTogglerDirective,
    FuseConfirmDialogComponent,
    FuseAlertDialogComponent,
    FuseCountdownComponent,
    FuseIfOnDomDirective,
    FusePerfectScrollbarDirective,
    FuseMaterialColorPickerComponent,
    AwsSrcDirective,
    AwsProfileDirective,
    GrantIfDirective
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
    SignaturePadModule
  ],
  exports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    FuseMatSidenavHelperDirective,
    FuseMatSidenavTogglerDirective,
    FusePipesModule,
    FuseCountdownComponent,
    FusePerfectScrollbarDirective,
    ReactiveFormsModule,
    ColorPickerModule,
    NgxDnDModule,
    NgxDatatableModule,
    FuseIfOnDomDirective,
    FuseMaterialColorPickerComponent,
    MarkdownModule,
    TranslateModule,
    AwsSrcDirective,
    SignaturePadModule,
    AwsProfileDirective,
    GrantIfDirective
  ],
  entryComponents: [
    FuseConfirmDialogComponent,
    FuseAlertDialogComponent
  ],
  providers: [
    CookieService,
    FuseMatchMedia,
    FuseNavbarVerticalService,
    FuseMatSidenavHelperService,
    FuseTranslationLoaderService
  ]
})

export class SharedModule {

}
