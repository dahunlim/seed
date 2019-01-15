import {NgModule} from "@angular/core";
import {TinComponent} from "./tin.component";
import {IonicPageModule} from "ionic-angular";

@NgModule({
  declarations: [TinComponent],
  imports: [IonicPageModule.forChild(TinComponent)],
  entryComponents: [TinComponent]
})

export class TinComponentModule{

}
