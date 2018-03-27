import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ComponentModule} from './component/component.module';
import {DirectiveModule} from './directive/directive.module';
import {PipeModule} from './pipe/pipe.module';
import {AnimationModule} from "./animation/animation.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ComponentModule,
    DirectiveModule,
    PipeModule,
    AnimationModule
  ],
  exports: [
    MaterialModule,
    ComponentModule,
    DirectiveModule,
    PipeModule,
    AnimationModule
  ]
})
export class SharedModule {

}

