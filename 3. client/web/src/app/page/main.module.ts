import {NgModule} from '@angular/core';
import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {SharedModule} from '../shared/shared.module';
import {HomeComponent} from './home/home.component';
import {TestaComponent} from "./test/testa.component";
import {TestbComponent} from "./test/testb.component";
import {TestcService} from "./testc.service";
import {CoreModule} from "../core/core.module";

@NgModule({
  imports: [
    MainRoutingModule,
    SharedModule,
    CoreModule
  ],
  declarations: [
    HomeComponent,
    MainComponent,
    TestaComponent,
    TestbComponent
  ],
  providers: [TestcService]
})
export class MainModule {
}
