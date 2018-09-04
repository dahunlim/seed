import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {NoticeListComponent} from './list/notice-list.component';
import {NoticeFormComponent} from './form/notice-form.component';
import {NoticeViewComponent} from './view/notice-view.component';
import {NoticeComponent} from './notice.component';
import {NoticeModifyComponent} from './modify/notice-modify.component';

const noticeRoutes: Routes = [
  {
    path: '',
    component: NoticeComponent,
    children: [
      {
        path: 'list',
        component: NoticeListComponent,
      },
      {
        path: 'form',
        component: NoticeFormComponent
      },
      {
        path: 'modify',
        component: NoticeModifyComponent
      },
      {
        path: 'view',
        component: NoticeViewComponent
      },
      {
        path: '**',
        redirectTo: '/list'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(noticeRoutes)],
  exports: [RouterModule]
})
export class NoticeRoutingModule { }
