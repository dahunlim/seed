import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddressComponent} from "./address.component";

@NgModule({
  declarations: [AddressComponent],
  imports: [IonicPageModule.forChild(AddressComponent)],
  entryComponents: [AddressComponent]
})
export class AddressComponentModule {
}
