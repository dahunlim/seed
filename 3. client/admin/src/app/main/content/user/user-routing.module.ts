import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {UserListComponent} from './list/user-list.component';
import {UserComponent} from './user.component';
import {UserFormComponent} from './form/user-form.component';

const userRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'list',
        component: UserListComponent
      },
      {
        path: 'form',
        component: UserFormComponent
      },
      {
        path: 'form/:userId',
        component: UserFormComponent
      },
      {
        path: '**',
        redirectTo: '/list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

