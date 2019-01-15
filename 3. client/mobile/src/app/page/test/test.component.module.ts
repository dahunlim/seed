import {NgModule} from "@angular/core";
import {TestComponent} from "./test.component";
import {IonicPageModule} from "ionic-angular";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [TestComponent],
  imports: [
    IonicPageModule.forChild(TestComponent),
    SharedModule,
    FormsModule
  ],
  entryComponents: [TestComponent]
})

export class TestComponentModule{

}
