import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TabsComponent} from "./tabs.component";

@NgModule({
  declarations: [TabsComponent],
  imports: [IonicPageModule.forChild(TabsComponent)],
  entryComponents: [TabsComponent]
})
export class TabsComponentModule {

}
