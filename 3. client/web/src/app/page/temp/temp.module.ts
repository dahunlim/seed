import {NgModule} from '@angular/core';
import {TempRoutingModule} from "./temp-routing.module";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {TempComponent} from "./temp.component";
import {TempElementComponent} from "./element/temp-element.component";

@NgModule({
  imports: [
    TempRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    TempComponent,
    TempElementComponent
  ],
})
export class TempModule {}
