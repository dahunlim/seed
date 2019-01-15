import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {ResponseInterceptor} from './core/interceptor/response.interceptor';
import {CoreModule} from './core/core.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {reducers} from './app.reducer';
import {TestaComponent} from './page/test/testa.component';

import {CustomSerializer} from './core/redux/router/router.serializer';
import {appEffects} from './app.effect';
import {AuthComponent} from "./page/auth/auth.component";


@NgModule({
  declarations: [
    AppComponent,
    // TestaComponent,
    AuthComponent
  ],
  imports: [
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({maxAge: 5}),
    EffectsModule.forRoot(appEffects),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    StoreRouterConnectingModule
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomSerializer},
    {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
