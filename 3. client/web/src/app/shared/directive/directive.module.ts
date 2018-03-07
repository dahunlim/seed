import {NgModule} from '@angular/core';
import {AppGrantDirective} from './grant.directive';

@NgModule({
  declarations: [
    AppGrantDirective
  ],
  exports: [
    AppGrantDirective
  ]
})
export class DirectiveModule {

}
