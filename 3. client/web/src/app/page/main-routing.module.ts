import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {MainComponent} from './main.component';
import {HomeComponent} from './home/home.component';
import {TestaComponent} from "./test/testa.component";
import {TestbComponent} from "./test/testb.component";

const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'testa', component: TestaComponent},
      { path: 'testb', component: TestbComponent},
      { path: 'temp', loadChildren: 'app/page/temp/temp.module#TempModule' },
      { path: 'notice', loadChildren: 'app/page/notice/notice.module#NoticeModule' },
      { path: 'inquiry', loadChildren: 'app/page/inquiry/inquiry.module#InquiryModule' },
      // { path: '**', redirectTo: 'temp' },
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
