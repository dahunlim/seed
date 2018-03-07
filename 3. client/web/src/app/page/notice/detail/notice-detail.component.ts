import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {Notice} from '../../../core/model/notice';
import {getResponse, getSelectedNotice} from '../redux/notice.selector';
import {AppStore} from '../../../app-store.interface';

import * as NoticeActions from '../redux/notice.action';
import {AppDialogConfirmComponent} from '../../../core/dialog/confirm/confirm.component';
import {Login} from '../../../core/model/login';

@Component({
  selector: 'app-notice-detail',
  templateUrl: 'notice-detail.component.html',
  styleUrls: ['notice-detail.component.scss']
})
export class NoticeDetailComponent implements OnInit, OnDestroy {

  private notice$: Observable<Notice>;
  private notice: Notice;
  private detailSub: any;
  private params: any;

  constructor(private store: Store<AppStore>, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
    this.notice = new Notice();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.params = params;
      this.store.dispatch(new NoticeActions.NoticeGetDetail(params['noticeID']));
      this.notice$ = this.store.select(getSelectedNotice);

      this.detailSub = this.notice$.subscribe( notice => {
        console.log(notice);
        if (!!notice && notice._id === params['noticeID']) {
          this.notice = notice;
        }
      })
    });
  }

  delete(): void {
    const dialogRef = this.dialog.open(AppDialogConfirmComponent, {
      data: {
        message: '삭제하시겠습니까?',
        ok: '확인',
        cancel: '취소'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new NoticeActions.NoticeDelete(this.params['noticeID']));
      }
    });
  }

  downloadFile() {
    this.notice$.subscribe(res => {
      this.store.dispatch(new NoticeActions.NoticeFileDownload(res.file['key'], res.file['name']))
    })
  }

  ngOnDestroy(): void {
    this.detailSub.unsubscribe();
  }
}
