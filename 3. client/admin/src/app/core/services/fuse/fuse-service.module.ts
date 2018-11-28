import {NgModule} from '@angular/core';

import {FuseConfigService} from './config.service';
import {FuseSplashScreenService} from './splash-screen.service';
import {FuseTranslationLoaderService} from './translation-loader.service';
import {FuseMatchMedia} from './match-media.service';

@NgModule({
  providers: [
    FuseConfigService,
    FuseMatchMedia,
    FuseSplashScreenService,
    FuseTranslationLoaderService
  ]
})
export class FuseServiceModule { }

