import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./app.reducer";
import {CoreModule} from "./core/core.module";
import {HttpClientModule} from "@angular/common/http";
import {effects} from "./app.effect";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers),
    CoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
