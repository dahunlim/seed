import {USER_LEVEL} from '../core/models/user';
import {FuseNavigationModelInterface} from '../shared/components/navigation/navigation.model';

export class FuseNavigationModel implements FuseNavigationModelInterface {
  public model: any[];

  constructor() {
    this.model = [
      {
        'id': 'menu',
        'title': 'Menus',
        'translate': 'NAV.MENU',
        'type': 'group',
        'icon': 'apps',
        'children': [
          {
            'id': 'dashboards',
            'title': 'Dashboards',
            'translate': 'NAV.DASHBOARDS',
            'type': 'item',
            'icon': 'dashboard',
            'url': '/dashboard',
            'grant': [USER_LEVEL.ADMIN, USER_LEVEL.STAFF, USER_LEVEL.MANAGER]
          },
          {
            'id': 'notice',
            'title': 'Notice',
            'translate': 'NAV.NOTICE',
            'type': 'item',
            'icon': 'assignment',
            'url': '/notice/list',
            'grant': [USER_LEVEL.ADMIN, USER_LEVEL.STAFF, USER_LEVEL.MANAGER, USER_LEVEL.INSTRUCTOR]
          },
          {
            'id': 'user',
            'title': 'User',
            'translate': 'NAV.USER',
            'type': 'item',
            'icon': 'person',
            'url': '/user/list',
            'grant': [USER_LEVEL.ADMIN, USER_LEVEL.STAFF, USER_LEVEL.MANAGER, USER_LEVEL.INSTRUCTOR]
          },
          {
            'id': 'one',
            'title': 'One',
            'translate': 'NAV.ONE',
            'type': 'item',
            'icon': 'today',
            'url': '/schedule/list',
            'grant': [USER_LEVEL.INSTRUCTOR]
          },
          {
            'id': 'manager',
            'title': 'Manager',
            'translate': 'NAV.MANAGER',
            'type': 'item',
            'icon': 'person',
            'url': '/manager/list',
            'grant': [USER_LEVEL.ADMIN, USER_LEVEL.STAFF]
          },
          {
            'id': 'instructor',
            'title': 'Instructor',
            'translate': 'NAV.INSTRUCTOR',
            'type': 'item',
            'icon': 'person',
            'url': '/instructor/list',
            'grant': [USER_LEVEL.ADMIN, USER_LEVEL.STAFF, USER_LEVEL.MANAGER]
          },
          {
            'id': 'applicant',
            'title': 'Applicant',
            'translate': 'NAV.APPLICANT',
            'type': 'item',
            'icon': 'person_outline',
            'url': '/applicant/list',
            'grant': [USER_LEVEL.ADMIN, USER_LEVEL.STAFF, USER_LEVEL.MANAGER]
          },
          {
            'id': 'lesson',
            'title': 'Lesson',
            'translate': 'NAV.LESSON',
            'type': 'item',
            'icon': 'bookmark',
            'url': '/lesson/list',
            'grant': [USER_LEVEL.ADMIN, USER_LEVEL.STAFF, USER_LEVEL.MANAGER, USER_LEVEL.INSTRUCTOR]
          },
          {
            'id': 'download',
            'title': 'Download',
            'translate': 'NAV.DOWNLOAD',
            'type': 'item',
            'icon': 'cloud_download',
            'url': '/download/list',
            'grant': [USER_LEVEL.ADMIN, USER_LEVEL.STAFF, USER_LEVEL.MANAGER, USER_LEVEL.INSTRUCTOR]
          }
        ]
      }
    ];
  }
}

