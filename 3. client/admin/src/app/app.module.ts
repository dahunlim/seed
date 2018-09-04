import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import {SharedModule} from './core/modules/shared.module';
import {AppComponent} from './app.component';
import {FuseMainModule} from './main/main.module';
import {FuseSplashScreenService} from './core/services/splash-screen.service';
import {FuseConfigService} from './core/services/config.service';
import {FuseNavigationService} from './core/components/navigation/navigation.service';
import {MarkdownModule} from 'angular2-markdown';
import {TranslateModule} from '@ngx-translate/core';
import {AppRoutingModule} from './app-routing.module';
import {StoreModule} from '@ngrx/store';

import {metaReducers, reducers} from './app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {RouterEffect} from './core/router/router.effect';
import {NoticeEffect} from './main/content/notice/redux/notice.effect';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {CustomSerializer} from './core/router/router.serializer';
import {CoreModule} from './core/core.module';
import {ResponseInterceptor} from './core/interceptors/response.interceptor';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {UserEffect} from './main/content/user/redux/user.effect';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot([
      UserEffect,
      NoticeEffect
    ]),
    MarkdownModule.forRoot(),
    TranslateModule.forRoot(),
    StoreRouterConnectingModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    FuseSplashScreenService,
    FuseConfigService,
    FuseNavigationService,
    {provide: RouterStateSerializer, useClass: CustomSerializer},
    {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
