import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from '@angular/common';

import {FormsModule} from "@angular/forms";
import {DirectiveModule} from './directive/directive.module';
import {MaterialModule} from './material/material.module';
import {ComponentModule} from './component/component.module';
import {PipeModule} from './pipe/pipe.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    DirectiveModule,
    MaterialModule,
    ComponentModule,
    PipeModule
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    DirectiveModule,
    MaterialModule,
    ComponentModule,
    PipeModule
  ],
  providers: [],
  declarations: []
})
export class SharedModule { }
