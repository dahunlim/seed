import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HomeComponent} from "./home.component";
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    IonicPageModule.forChild(HomeComponent)
  ],
  entryComponents: [HomeComponent]
})
export class HomeComponentModule {
}
