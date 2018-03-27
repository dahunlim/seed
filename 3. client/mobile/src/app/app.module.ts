import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { EffectsModule} from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./app.reducer";
import { CoreModule } from "./core/core.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { effects } from "./app.effect";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ResponseInterceptor } from "./core/interceptor/response.interceptor";
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    }),
    CoreModule,
    NgProgressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true}
  ]
})
export class AppModule {}
