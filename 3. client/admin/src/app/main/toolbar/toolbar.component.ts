import {Component} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {FuseConfigService} from '../../core/services/fuse/config.service';
import {TranslateService} from '@ngx-translate/core';
import {SessionService} from '../../core/services/aram/session.service';
import {Store} from '@ngrx/store';
import {AppStore} from '../../app-store.interface';

import * as MembershipActions from '../../core/redux/membership/membership.action';

@Component({
  selector: 'fuse-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class FuseToolbarComponent {
  userStatusOptions: any[];
  languages: any;
  selectedLanguage: any;
  showLoadingBar: boolean;
  horizontalNav: boolean;

  user: any;

  constructor(private router: Router,
              private fuseConfig: FuseConfigService,
              private translate: TranslateService,
              private sessionService: SessionService,
              private store: Store<AppStore>
  ) {

    this.userStatusOptions = [
      {
        'title': 'Online',
        'icon': 'icon-checkbox-marked-circle',
        'color': '#4CAF50'
      },
      {
        'title': 'Away',
        'icon': 'icon-clock',
        'color': '#FFC107'
      },
      {
        'title': 'Do not Disturb',
        'icon': 'icon-minus-circle',
        'color': '#F44336'
      },
      {
        'title': 'Invisible',
        'icon': 'icon-checkbox-blank-circle-outline',
        'color': '#BDBDBD'
      },
      {
        'title': 'Offline',
        'icon': 'icon-checkbox-blank-circle-outline',
        'color': '#616161'
      }
    ];

    this.languages = [
      {
        'id': 'kr',
        'title': '한국어',
        'flag': 'kr'
      },
      {
        'id': 'en',
        'title': 'English',
        'flag': 'us'
      }
    ];

    this.selectedLanguage = this.languages[0];

    router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.showLoadingBar = true;
        }
        if (event instanceof NavigationEnd) {
          this.showLoadingBar = false;
        }
      });

    this.fuseConfig.onSettingsChanged.subscribe((settings) => {
      this.horizontalNav = settings.layout.navigation === 'top';
    });

    this.user = {
      _id: this.sessionService.getValue('userId'),
      name: this.sessionService.getValue('userName')
    };
  }

  search(value) {
    // Do your search here...
    console.log(value);
  }

  setLanguage(lang) {
    // Set the selected language for toolbar
    this.selectedLanguage = lang;

    // Use the selected language for translations
    this.translate.use(lang.id);
  }

  profile() {

  }

  logout() {
    this.store.dispatch(new MembershipActions.MembershipLogout());
  }

  alarm() {

  }
}
