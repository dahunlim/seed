import {NgModule} from "@angular/core";
import {TupComponent} from "./tup.component";
import {IonicPageModule} from "ionic-angular";

@NgModule({
  declarations: [TupComponent],
  imports: [IonicPageModule.forChild(TupComponent)],
  entryComponents: [TupComponent]
})

export class TupComponentModule{

}
