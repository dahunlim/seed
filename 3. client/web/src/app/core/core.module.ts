import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

import {CanActiveViaAuthGuard} from './guard/auth.guard';
import {ApiModule} from './api/api.module';
import {DialogModule} from './dialog/dialog.module';
import {HttpService} from './service/http.service';
import {SessionService} from './service/session.service';
import {DaumService} from './service/daum.service';
import {DialogService} from "./service/dialog";

@NgModule({
  imports: [
    HttpClientModule,
    ApiModule,
    DialogModule
  ],
  exports: [],
  declarations: [],
  entryComponents: [],
  providers: [
    HttpService,
    SessionService,
    DaumService,
    DialogService,
    CanActiveViaAuthGuard
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) { }
}
