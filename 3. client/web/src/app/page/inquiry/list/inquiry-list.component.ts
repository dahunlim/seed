import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {Inquiry} from '../../../core/model/inquiry';
import {AppStore} from '../../../app-store.interface';
import {getInquiry, getInquiryTotalCount} from '../redux/inquiry.selector';
import * as InquiryActions from '../redux/inquiry.action';

@Component({
  selector: 'app-inquiry-list',
  templateUrl: 'inquiry-list.component.html',
  styleUrls: ['inquiry-list.component.scss']
})
export class InquiryListComponent implements OnInit, OnDestroy {

  private static COUNT_PER_PAGE = 10;
  private inquiry$: Observable<Inquiry[]>;
  private totalCount$: Observable<number>;
  private currentPage: number;
  private step: number;
  private sub: any;

  constructor(private store: Store<AppStore>, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.step = InquiryListComponent.COUNT_PER_PAGE;
    this.sub = this.route.params.subscribe(params => {
      this.currentPage = params['pageNumber'];
      const offset = (this.currentPage - 1) * InquiryListComponent.COUNT_PER_PAGE;
      this.store.dispatch(new InquiryActions.InquiryGetList(offset, InquiryListComponent.COUNT_PER_PAGE));

      this.inquiry$ = this.store.select(getInquiry);
      this.totalCount$ = this.store.select(getInquiryTotalCount);
    });
  }

  goToDetail(state, id) {
    // console.log('state 값 : ' + state + ' state 타입 : ' + typeof state);
    if (state === 0) { // 미답변
      this.router.navigate(['/inquiry/reply/' + id, {}]);
    } else if (state === 1) { // 답변완료
      this.router.navigate(['/inquiry/detail/' + id, {}]);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    // throw new Error('Method not implemented.');
  }

}
