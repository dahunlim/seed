import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {JoinsComponent} from "./joins/joins.component";
import {LoginsComponent} from "./logins/logins.component";

const authRoutes: Routes = [
  { path: 'joins', component: JoinsComponent },
  { path: 'logins', component: LoginsComponent},
  { path: '', redirectTo: 'logins'}
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {}
