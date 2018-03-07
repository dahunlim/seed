import {NgModule} from '@angular/core';
import {AramPagingComponent} from './aram-paging/aram-paging.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AramPagingComponent,
    SearchBarComponent
  ],
  exports: [
    AramPagingComponent,
    SearchBarComponent
  ]
})
export class ComponentModule {}
