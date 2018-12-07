import {NgModule} from '@angular/core';
import {AppGrantDirective} from "./grant.directive";
import {RoutePageDirective} from "./routePage.directive";

@NgModule({
  declarations: [
    AppGrantDirective,
    RoutePageDirective
  ],
  exports: [
    AppGrantDirective,
    RoutePageDirective
  ]
})
export class DirectiveModule { }
