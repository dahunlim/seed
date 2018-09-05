import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from '../../../shared/shared.module';
import {FuseWidgetModule} from '../../../shared/components/widget/widget.module';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes),
    SharedModule,
    FuseWidgetModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
