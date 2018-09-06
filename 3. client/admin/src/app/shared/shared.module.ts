import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {MaterialModule} from './material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ColorPickerModule} from 'ngx-color-picker';
import {NgxDnDModule} from '@swimlane/ngx-dnd';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {FusePipesModule} from './pipes/pipes.module';
import {CookieService} from 'ngx-cookie-service';
import {MarkdownModule} from 'angular2-markdown';
import {TranslateModule} from '@ngx-translate/core';
import {SignaturePadModule} from 'angular2-signaturepad';
import {DirectiveModule} from './directives/directive.module';
import {FuseMaterialColorPickerComponent} from './components/material-color-picker/material-color-picker.component';
import {ComponentModule} from './components/component.module';

@NgModule({
  declarations: [
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
    DirectiveModule,
    ComponentModule
  ],
  exports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    FusePipesModule,
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
  ],
  providers: [
    CookieService
  ]
})

export class SharedModule {

}
