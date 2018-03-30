import { Component } from '@angular/core';
import {IonicPage, NavParams, ToastController} from "ionic-angular";
import * as RouterActions from "../../../core/router/router.action";
import * as InquiryActions from "../redux/inquiry.action";
import {Store} from "@ngrx/store";
import {AppStore} from "../../../app-store.interface";
import {Inquiry} from "../../../core/model/inquiry";

@IonicPage({
  name: 'InquiryCreateComponent',
  segment: 'inquiry/create'
})
@Component({
  selector: 'page-inquiry-ionic',
  templateUrl: './inquiry-create.component.html'
})
export class InquiryCreateComponent {
  private inquiryId : string;
  private inquiry : Inquiry;

  constructor(private store: Store<AppStore>, private navParams: NavParams, private toastCtrl: ToastController) {
    this.inquiry = new Inquiry();
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

  add() {
    this.store.dispatch(new InquiryActions.InquiryAdd(this.inquiry));
  }
}
