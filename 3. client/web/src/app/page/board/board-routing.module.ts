import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BoardListComponent} from './list/board-list.component';
import {BoardDetailComponent} from "./detail/board-detail.component";

const boardRoutes: Routes = [
  {
    path: '',
    component: null,
    children: [
      { path: 'list', component: BoardListComponent },
      { path: 'view', component: BoardDetailComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(boardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BoardRoutingModule {}
