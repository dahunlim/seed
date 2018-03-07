import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import * as NoticeActions from '../redux/notice.action';
import {Notice} from '../../../core/model/notice';
import {AppStore} from '../../../app-store.interface';
import {getNotices, getNoticeTotalCount} from '../redux/notice.selector';

@Component({
  selector: 'app-notice-list',
  templateUrl: 'notice-list.component.html',
  styleUrls: ['notice-list.component.scss']
})
export class NoticeListComponent implements OnInit, OnDestroy {

  private static COUNT_PER_PAGE = 10;
  private notice$: Observable<Notice[]>;
  private totalCount$: Observable<number>;
  private currentPage: number;
  private step: number;
  private sub: any;

  constructor(private store: Store<AppStore>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.step = NoticeListComponent.COUNT_PER_PAGE;
    this.sub = this.route.params.subscribe(params => {
      this.currentPage = params['pageNumber'];
      const offset = (this.currentPage - 1) * NoticeListComponent.COUNT_PER_PAGE;
      this.store.dispatch(new NoticeActions.NoticeGetList(offset, NoticeListComponent.COUNT_PER_PAGE));

      /* 2018. 01. 22. Edit */
      this.notice$ = this.store.select(getNotices);
      this.totalCount$ = this.store.select(getNoticeTotalCount);
      this.notice$.subscribe(rs => {
      })
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
