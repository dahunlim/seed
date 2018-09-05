import {NgModule} from '@angular/core';
import {UserRoutingModule} from './user-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {UserComponent} from './user.component';
import {UserListComponent} from './list/user-list.component';
import {UserFormComponent} from './form/user-form.component';

@NgModule({
  imports: [
    UserRoutingModule,
    SharedModule
  ],
  declarations: [
    UserComponent,
    UserListComponent,
    UserFormComponent
  ]
})
export class UserModule { }
