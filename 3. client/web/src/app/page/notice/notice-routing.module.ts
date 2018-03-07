import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {NoticeListComponent} from "./list/notice-list.component";
import {NoticeDetailComponent} from "./detail/notice-detail.component";
import {NoticeFormComponent} from "./form/notice-form.component";
import {NoticeCreateComponent} from "./create/notice-create.component";
import {NoticeComponent} from "./notice.component";

const noticeRoutes: Routes = [
  {
    path: '',
    component: NoticeComponent,
    children: [
      { path: 'list/:pageNumber', component: NoticeListComponent },
      { path: 'detail/:noticeID', component: NoticeDetailComponent },
      { path: 'form/:noticeID', component: NoticeFormComponent },
      { path: 'create', component: NoticeCreateComponent },
      { path: '**', redirectTo: 'list/1' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(noticeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class NoticeRoutingModule {}
