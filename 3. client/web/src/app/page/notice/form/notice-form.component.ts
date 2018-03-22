import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Notice} from '../../../core/model/notice';
import {Observable} from 'rxjs/Observable';

import * as NoticeActions from '../redux/notice.action';
import {getSelectedNotice} from '../redux/notice.selector';
import {Store} from '@ngrx/store';
import {AppStore} from '../../../app-store.interface';

@Component({
  selector: 'app-notice-form',
  templateUrl: 'notice-form.component.html',
  styleUrls: ['notice-form.component.scss']
})
export class NoticeFormComponent implements OnInit, OnDestroy {
  private notice$: Observable<Notice>;
  private notice: Notice;
  private detailSub: any;
  private params: any;

  constructor(private store: Store<AppStore>, private route: ActivatedRoute, private router: Router) {
    this.notice = new Notice();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.params = params;
      this.store.dispatch(new NoticeActions.NoticeGetDetail(params['noticeID']));
      this.notice$ = this.store.select(getSelectedNotice);

      this.detailSub = this.notice$.subscribe(notice => {
        if (!!notice && notice._id === params['noticeID']) {
          this.notice = notice;
        }
      })
    });

    const file = document.getElementById('notice-form-file');
    Observable.fromEvent(file, 'change')
      .subscribe((event: any) => {
        this.notice.file = event.target.files[0];
      });

    const link = document.getElementById('link');
    Observable.fromEvent(link, 'click')
      .subscribe((event: any) => {
        if (!event.target.value || event.target.value === 'undefined') {
          this.notice.link = 'https://www.'
        }
      });
  }

  addFile() {
    document.getElementById('notice-form-file').click();
  }

  save() {
    // const notice = new Notice(this.notice.title, this.notice.contents, this.notice.file, this.notice.link, this.params['noticeID']);
    if (!this.notice.title || !this.notice.contents) {
      alert('제목 또는 내용이 입력되어 있지 않습니다.');
      return false;
    }
    this.store.dispatch(new NoticeActions.NoticeModify(this.notice));
  }

  ngOnDestroy(): void {
    this.detailSub.unsubscribe();
  }
}
