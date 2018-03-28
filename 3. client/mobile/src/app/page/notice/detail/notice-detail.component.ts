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

  constructor(private store: Store<AppStore>, private navParams: NavParams, private alertCtrl: AlertController) {

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

  delete(): void {
    let confirm = this.alertCtrl.create({
      title: '삭제 하시겠습니까?',
      subTitle: '',
      cssClass: ' noticeDelete',
      buttons: [
        {
          text: '삭제',
          handler: () => {
            this.store.dispatch(new NoticeActions.NoticeDelete(this.noticeId));
          }
        },
        {
          text: '취소',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  goToModify(noticeId: string) {
    this.store.dispatch(new RouterActions.Go('NoticeModifyComponent', {noticeId : noticeId}));
  }

  back() {
    this.store.dispatch(new RouterActions.Back());
  }
}
