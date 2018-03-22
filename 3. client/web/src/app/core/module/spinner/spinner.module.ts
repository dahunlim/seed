import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {SpinnerComponent} from "./spinner.component";
import {SpinnerService} from "./spinner.service";

@NgModule({
  imports: [
    SharedModule
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

