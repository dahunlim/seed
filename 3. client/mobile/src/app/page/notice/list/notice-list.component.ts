import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";
import * as RouterActions from "../../../core/router/router.action";
import * as NoticeActions from "../redux/notice.action"
import {Store} from "@ngrx/store";
import {AppStore} from "../../../app-store.interface";
import {getNoticeList} from "../redux/notice.selector";

@IonicPage({
  name: 'NoticeListComponent',
  segment: 'notice/list'
})
@Component({
  selector: 'page-notice-ionic',
  templateUrl: './notice-list.component.html'
})
export class NoticeListComponent {
  private notice$: any;
  constructor(private store: Store<AppStore>) {

  }

  ionViewDidLoad() {
    this.notice$ = this.store.select(getNoticeList);
  }

  ionViewDidEnter() {
    this.store.dispatch(new NoticeActions.NoticeGetList(0, 999));
  }

  goToPage(str: string, noticeId: string) {
    switch (str) {
      case 'detail' :
        this.store.dispatch(new RouterActions.Go('NoticeDetailComponent', {noticeId : noticeId}));
        break;
      case 'create' :
        this.store.dispatch(new RouterActions.Go('NoticeCreateComponent'));
        break;
    }
  }

  back() {
    this.store.dispatch(new RouterActions.Back());
  }
}
