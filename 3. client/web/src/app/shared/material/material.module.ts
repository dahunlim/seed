import {NgModule} from '@angular/core';
import {AngularMaterial} from './angular.material';
import {BMaterial} from "./b.material";

@NgModule({
  imports: [
    AngularMaterial,
    BMaterial
  ],
  exports: [
    AngularMaterial,
    BMaterial
  ]
})
export class MaterialModule { }
