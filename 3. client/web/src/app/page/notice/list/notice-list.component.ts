import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import * as NoticeActions from '../redux/notice.action';
import {Notice} from '../../../core/model/notice';
import {AppStore} from '../../../app-store.interface';
import {getNoticeList, getNoticeTotalCount} from '../redux/notice.selector';
import * as RouterActions from '../../../core/router/router.action';

@Component({
  selector: 'app-notice-list',
  templateUrl: 'notice-list.component.html',
  styleUrls: ['notice-list.component.scss']
})
export class NoticeListComponent implements OnInit, OnDestroy {

  private static COUNT_PER_PAGE = 10;
  private notice$: any;

  constructor(private store: Store<AppStore>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.store.dispatch(new NoticeActions.NoticeGetList(0, 10));
    this.notice$ = this.store.select(getNoticeList);
    // this.notice$ = this.store
    //   .filter((data) => {
    //     if (!!data) { return true } else { return false }
    //   })
    //   .subscribe(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (error) => {
    //
    //   },
    //   () => {
    //     console.log('complete');
    //     this.notice$.unsubscribe();
    //   })
  }
  ngOnDestroy(): void {
  }

  goCreate() {
    this.store.dispatch(new RouterActions.Go({path: ['/main/notice/create']}));
  }
}
