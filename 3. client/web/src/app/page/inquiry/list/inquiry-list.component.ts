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

  inquiry$: any;

  constructor(private store: Store<AppStore>, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(new InquiryActions.InquiryGetList(0, 10));
    this.inquiry$ = this.store.select(getInquiry);
  }

  goCreate() {
    this.store.dispatch(new RouterActions.Go({path: ['/main/inquiry/create']}));
  }

  goToDetail(state, id) {
    // console.log('state 값 : ' + state + ' state 타입 : ' + typeof state);
    if (state === 0) { // 미답변
      this.router.navigate(['/main/inquiry/reply/' + id, {}]);
    } else if (state === 1) { // 답변완료
      this.router.navigate(['/main/inquiry/detail/' + id, {}]);
    }
  }

  ngOnDestroy(): void {

  }
}
