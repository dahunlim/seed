import { Component } from '@angular/core';
import {AlertController, IonicPage, NavParams} from "ionic-angular";
import * as RouterActions from "../../../core/router/router.action";
import * as NoticeActions from "../redux/notice.action"
import {Store} from "@ngrx/store";
import {AppStore} from "../../../app-store.interface";
import {getNoticeDetail} from "../redux/notice.selector";
import {Observable} from "rxjs/Observable";
import {Notice} from "../../../core/model/notice";

@IonicPage({
  name: 'NoticeModifyComponent',
  segment: 'notice/modify'
})
@Component({
  selector: 'page-notice-ionic',
  templateUrl: './notice-modify.component.html'
})
export class NoticeModifyComponent {
  private noticeId : string;
  private notice : Notice;

  constructor(private store: Store<AppStore>, private navParams: NavParams) {
    const link = document.getElementById('link');
    Observable.fromEvent(link, 'click')
      .subscribe((event: any) => {
        console.log('check')
        /*if (!event.target.value) {
          this.notice.link = 'https://www.'
        }*/
      })
  }

  ionViewDidLoad() {
    if(!!this.navParams.data.noticeId) {
      this.noticeId = this.navParams.data.noticeId;
      // this.store.dispatch(new NoticeActions.NoticeGetDetail(this.noticeId));
      this.store.select(getNoticeDetail(this.noticeId)).subscribe((data) => {
        this.notice = data;
      }).unsubscribe();
    } else {
      this.back();
    }
  }

  modify() {
    console.log('modify');
    if (!this.notice.title || !this.notice.contents) {
      // this.dialog.alert('제목 또는 내용이 입력되어 있지 않습니다.');
      return false;
    }
    this.store.dispatch(new NoticeActions.NoticeModify(this.notice));
  }

  back() {
    this.store.dispatch(new RouterActions.Back());
  }
}
