import { Component } from '@angular/core';
import {IonicPage, NavParams, ToastController} from "ionic-angular";
import * as RouterActions from "../../../core/router/router.action";
import * as NoticeActions from "../redux/notice.action"
import {Store} from "@ngrx/store";
import {AppStore} from "../../../app-store.interface";
import {getNoticeDetail} from "../redux/notice.selector";
import {Notice} from "../../../core/model/notice";

@IonicPage({
  name: 'NoticeCreateComponent',
  segment: 'notice/create'
})
@Component({
  selector: 'page-notice-ionic',
  templateUrl: './notice-create.component.html'
})
export class NoticeCreateComponent {
  private noticeId : string;
  private notice : Notice;

  constructor(private store: Store<AppStore>, private navParams: NavParams, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

  }

  toast(msg: string = 'null', position: string = 'top') {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: position
    }).present();
  }

  back() {
    this.store.dispatch(new RouterActions.Back());
  }
}
