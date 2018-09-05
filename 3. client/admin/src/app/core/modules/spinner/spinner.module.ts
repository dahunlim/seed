import {NgModule} from '@angular/core';
import {SpinnerComponent} from './spinner.component';
import {SpinnerService} from './spinner.service';
import {MaterialModule} from '../../../shared/material/material.module';

@NgModule({
  imports: [
    MaterialModule
  ],
  exports: [
    SpinnerComponent
  ],
  declarations: [
    SpinnerComponent
  ],
  providers: [
    SpinnerService
  ]
})
export class SpinnerModule { }
