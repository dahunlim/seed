import {Component} from '@angular/core';
import {FuseSplashScreenService} from './core/services/fuse/splash-screen.service';
import {TranslateService} from '@ngx-translate/core';
import {FuseTranslationLoaderService} from './core/services/fuse/translation-loader.service';

import {FuseNavigationService} from './core/components/navigation/navigation.service';
import {FuseNavigationModel} from './navigation/navigation.model';
import {locale as navigationEnglish} from './navigation/i18n/en';
import {locale as navigationKorean} from './navigation/i18n/kr';

@Component({
  selector: 'fuse-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private fuseNavigationService: FuseNavigationService,
    private fuseSplashScreen: FuseSplashScreenService,
    private translate: TranslateService,
    private translationLoader: FuseTranslationLoaderService
  ) {

    // Add languages
    this.translate.addLangs(['kr', 'en']);

    // Set the default language
    this.translate.setDefaultLang('kr');

    // Use a language
    this.translate.use('kr');

    // Set the navigation model
    this.fuseNavigationService.setNavigationModel(new FuseNavigationModel());

    // Set the navigation translations
    this.translationLoader.loadTranslations(navigationEnglish, navigationKorean);
  }
}
