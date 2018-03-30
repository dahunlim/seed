import { Component } from '@angular/core';
import {IonicPage, NavParams, ToastController} from "ionic-angular";
import * as RouterActions from "../../../core/router/router.action";
import * as InquiryActions from "../redux/inquiry.action";
import {Store} from "@ngrx/store";
import {AppStore} from "../../../app-store.interface";
import {Inquiry} from "../../../core/model/inquiry";
import {getInquiryDetail} from "../redux/inquiry.selector";

@IonicPage({
  name: 'InquiryModifyComponent',
  segment: 'inquiry/modify'
})
@Component({
  selector: 'page-inquiry-ionic',
  templateUrl: './inquiry-modify.component.html'
})
export class InquiryModifyComponent {
  private inquiryId : string;
  private inquiry : Inquiry;

  constructor(private store: Store<AppStore>, private navParams: NavParams, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    if(!!this.navParams.data.inquiryId) {
      this.inquiryId = this.navParams.data.inquiryId;
      this.store.select(getInquiryDetail(this.inquiryId)).subscribe(data => {
        this.inquiry = data;
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
    if (!this.inquiry.title || !this.inquiry.question || !this.inquiry.answer.contents) {
      this.toast('제목 또는 내용이 입력되어 있지 않습니다.');
      return false;
    }
    this.store.dispatch(new InquiryActions.InquiryModify(this.inquiry));
  }

  back() {
    this.store.dispatch(new RouterActions.Back());
  }
}
