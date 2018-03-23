import {NgModule} from '@angular/core';
import {AramDatePeriodPipe} from "./aramDatePeriodPipe";
import {AramTimePipe} from "./aramTimeConvertPipe";

@NgModule({
  declarations: [
    AramDatePeriodPipe,
    AramTimePipe
  ],
  exports: [
    AramDatePeriodPipe,
    AramTimePipe
  ]
})
export class PipeModule { }
