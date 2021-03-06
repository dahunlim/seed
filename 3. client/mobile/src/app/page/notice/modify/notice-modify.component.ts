import { Component } from '@angular/core';
import {IonicPage, NavParams, ToastController} from "ionic-angular";
import * as RouterActions from "../../../core/router/router.action";
import * as NoticeActions from "../redux/notice.action"
import {Store} from "@ngrx/store";
import {AppStore} from "../../../app-store.interface";
import {getNoticeDetail} from "../redux/notice.selector";
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

  constructor(private store: Store<AppStore>, private navParams: NavParams, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    if(!!this.navParams.data.noticeId) {
      this.noticeId = this.navParams.data.noticeId;
      this.store.select(getNoticeDetail(this.noticeId)).subscribe(data => {
        this.notice = data;
      }).unsubscribe();
    } else {
      this.back();
    }
  }

  toast(msg: string = 'null', position: string = 'top') {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: position
    }).present();
  }

  modify() {
    console.log('modify');
    if (!this.notice.title || !this.notice.contents) {
      this.toast('제목 또는 내용이 입력되어 있지 않습니다.');
      return false;
    }
    this.store.dispatch(new NoticeActions.NoticeModify(this.notice));
  }

  back() {
    this.store.dispatch(new RouterActions.Back());
  }
}
