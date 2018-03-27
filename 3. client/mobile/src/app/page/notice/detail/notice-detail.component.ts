import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";
import * as RouterActions from "../../../core/router/router.action";
import * as NoticeActions from "../redux/notice.action"
import {Store} from "@ngrx/store";
import {AppStore} from "../../../app-store.interface";
import {getNoticeDetail} from "../redux/notice.selector";
import { NgProgress } from 'ngx-progressbar';

@IonicPage({
  name: 'NoticeDetailComponent',
  segment: 'notice/detail'
})
@Component({
  selector: 'page-notice-ionic',
  templateUrl: './notice-detail.component.html'
})
export class NoticeDetailComponent {
  constructor(private store: Store<AppStore>, public ngProgress: NgProgress) {

  }

  ionViewDidLoad() {
    this.ngProgress.start();
  }

  test() {
    this.ngProgress.done();
  }

  back() {
    this.store.dispatch(new RouterActions.Back());
  }
}
