import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CanActiveViaAuthGuard} from './core/guards/auth.guard';

const appRoutes: Routes = [
  {
    path: 'membership',
    loadChildren: './main/content/membership/membership.module#MembershipModule'
  },
  {
    path: 'dashboard',
    loadChildren: './main/content/dashboard/dashboard.module#DashboardModule',
    canActivate: [CanActiveViaAuthGuard]
  },
  {
    path: 'notice',
    loadChildren: './main/content/notice/notice.module#NoticeModule',
    canActivate: [CanActiveViaAuthGuard]
  },
  {
    path: 'user',
    loadChildren: './main/content/user/user.module#UserModule',
    canActivate: [CanActiveViaAuthGuard]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
