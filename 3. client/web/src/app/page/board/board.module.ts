import {NgModule} from "@angular/core";
import {BoardRoutingModule} from "./board-routing.module";
import {BoardListComponent} from "./list/board-list.component";
import {BoardDetailComponent} from "./detail/board-detail.component";
import {BoardService} from './board.service';

@NgModule({
  imports: [
    BoardRoutingModule
  ],
  declarations: [
    BoardListComponent,
    BoardDetailComponent
  ],
  exports: [],
  providers: [
    BoardService
  ]
})
export class BoardModule {}
