import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TempElementComponent} from "./element/temp-element.component";

const tempRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'element', component: TempElementComponent },
      { path: '**', redirectTo: 'element' },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(tempRoutes)],
  exports: [RouterModule]
})
export class TempRoutingModule {}
