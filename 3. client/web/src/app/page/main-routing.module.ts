import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {MainComponent} from './main.component';
import {HomeComponent} from './home/home.component';

const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'temp', loadChildren: 'app/page/temp/temp.module#TempModule' },
      { path: 'notice', loadChildren: 'app/page/notice/notice.module#NoticeModule' },
      { path: 'inquiry', loadChildren: 'app/page/inquiry/inquiry.module#InquiryModule' },
      { path: '**', redirectTo: 'temp' },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule {}
