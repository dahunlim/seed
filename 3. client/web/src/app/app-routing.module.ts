import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TestaComponent} from 'app/page/test/testa.component';
import {AuthComponent} from "./page/auth/auth.component";

const appRoutes: Routes = [
  {path: 'auth', loadChildren: 'app/page/auth/auth.module#AuthModule'},
  {path: 'main', loadChildren: 'app/page/main.module#MainModule'},
  {path: '', loadChildren: 'app/page/account/account.module#AccountModule'},
  // {path: '**', redirectTo: 'auth'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
