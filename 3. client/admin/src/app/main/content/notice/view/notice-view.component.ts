import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppStore} from '../../../../app-store.interface';
import {Notice} from '../../../../core/models/notice';
import * as NoticeActions from '../redux/notice.action';
import {getSelectedNotice} from '../redux/notice.selector';
import {Observable} from 'rxjs/Observable';
import {fuseAnimations} from '../../../../core/animations';

import * as RouterActions from '../../../../core/router/router.action';

@Component({
  selector: 'notice-view',
  styleUrls: ['./notice-view.component.scss'],
  templateUrl: './notice-view.component.html',
  animations: fuseAnimations
})
export class NoticeViewComponent implements OnInit, OnDestroy{

  notice: Notice;
  notice$: any;

  constructor(private store: Store<AppStore>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.notice$ = this.store.select(getSelectedNotice).subscribe(notice => {
      if (!notice){
        this.store.dispatch(new RouterActions.Back());
      } else {
        this.notice = notice;
      }
    });
  }

  ngOnDestroy(): void {
    this.notice$.unsubscribe();
  }

  modify(): void {
    this.store.dispatch(new RouterActions.Go({path: ['/notice/modify']}));
  }
}
