import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CanActiveViaAuthGuard} from './guards/auth.guard';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/delay';

import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/forkJoin';

import {SpinnerModule} from './modules/spinner/spinner.module';
import {BrowserAnimationsModule} from '../../../node_modules/@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '../../../node_modules/@angular/common/http';
import {FuseMainModule} from '../main/main.module';
import {ApiModule} from './apis/api.module';
import {ServiceModule} from './services/service.module';


@NgModule({
  imports: [
    SpinnerModule,
    ApiModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FuseMainModule,
    ServiceModule
  ],
  exports: [
    SpinnerModule
  ],
  declarations: [],
  providers: [
    CanActiveViaAuthGuard
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('FuseModule is already loaded. Import it in the AppModule only!');
    }
  }

  // static forRoot(config): ModuleWithProviders {
  //   return {
  //     ngModule: CoreModule,
  //     providers: [
  //       {
  //         provide: FUSE_CONFIG,
  //         useValue: config
  //       }
  //     ]
  //   };
  // }
}

