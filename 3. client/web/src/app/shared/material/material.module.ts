import {NgModule} from '@angular/core';
import {AngularMaterial} from './angular.material';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [
    AngularMaterial,
    FlexLayoutModule
  ],
  exports: [
    AngularMaterial,
    FlexLayoutModule
  ]
})
export class MaterialModule { }
