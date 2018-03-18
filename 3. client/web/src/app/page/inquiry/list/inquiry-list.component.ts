import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {Inquiry} from '../../../core/model/inquiry';
import {AppStore} from '../../../app-store.interface';
import {getInquiry, getInquiryTotalCount} from '../redux/inquiry.selector';
import * as InquiryActions from '../redux/inquiry.action';
import * as RouterActions from '../../../core/router/router.action';

@Component({
  selector: 'app-inquiry-list',
  templateUrl: 'inquiry-list.component.html',
  styleUrls: ['inquiry-list.component.scss']
})
export class InquiryListComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppStore>, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

  }

  goCreate() {
    console.log('Go Create Page');
    this.store.dispatch(new RouterActions.Go({path: ['/inquiry/create']}));
  }

  ngOnDestroy(): void {

  }
}
