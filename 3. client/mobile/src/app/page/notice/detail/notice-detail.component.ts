import { Component } from '@angular/core';
import {IonicPage, NavParams} from "ionic-angular";
import * as RouterActions from "../../../core/router/router.action";
import * as NoticeActions from "../redux/notice.action"
import {Store} from "@ngrx/store";
import {AppStore} from "../../../app-store.interface";
import {getNoticeDetail} from "../redux/notice.selector";
import {Observable} from "rxjs/Observable";
import {Notice} from "../../../core/model/notice";

@IonicPage({
  name: 'NoticeDetailComponent',
  segment: 'notice/detail'
})
@Component({
  selector: 'page-notice-ionic',
  templateUrl: './notice-detail.component.html'
})
export class NoticeDetailComponent {
  private notice$ : Observable<Notice>;
  private noticeId : string;

  constructor(private store: Store<AppStore>, private navParams: NavParams) {

  }

  ionViewDidLoad() {
    if(!!this.navParams.data.noticeId) {
      this.noticeId = this.navParams.data.noticeId;
      this.store.dispatch(new NoticeActions.NoticeGetDetail(this.noticeId));
      this.notice$ = this.store.select(getNoticeDetail(this.noticeId));
    } else {
      this.back();
    }
  }

  back() {
    this.store.dispatch(new RouterActions.Back());
  }
}
