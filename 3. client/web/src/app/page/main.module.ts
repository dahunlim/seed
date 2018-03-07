import {NgModule} from '@angular/core';
import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {SharedModule} from '../shared/shared.module';
import {HomeComponent} from './home/home.component';

@NgModule({
  imports: [
    MainRoutingModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    MainComponent
  ]
})
export class MainModule {
}
