import { Component } from '@angular/core';
import {AlertController, IonicPage, NavParams} from "ionic-angular";
import * as RouterActions from "../../../core/router/router.action";
import * as InquiryActions from "../redux/inquiry.action";
import {Store} from "@ngrx/store";
import {AppStore} from "../../../app-store.interface";
import {Observable} from "rxjs/Observable";
import {Inquiry} from "../../../core/model/inquiry";
import {getInquiryDetail} from "../redux/inquiry.selector";

@IonicPage({
  name: 'InquiryDetailComponent',
  segment: 'inquiry/detail'
})
@Component({
  selector: 'page-inquiry-ionic',
  templateUrl: './inquiry-detail.component.html'
})
export class InquiryDetailComponent {
  private inquiry$ : Observable<Inquiry>;
  private inquiryId : string;

  constructor(private store: Store<AppStore>, private navParams: NavParams, private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    if(!!this.navParams.data.inquiryId) {
      this.inquiryId = this.navParams.data.inquiryId;
      this.store.dispatch(new InquiryActions.InquiryGetDetail(this.inquiryId));
      this.inquiry$ = this.store.select(getInquiryDetail(this.inquiryId));
    } else {
      this.back();
    }
  }

  goToModify(inquiryId: string) {
    this.store.dispatch(new RouterActions.Go('InquiryModifyComponent', {inquiryId : inquiryId}));
  }

  delete(): void {
    let confirm = this.alertCtrl.create({
      title: '삭제 하시겠습니까?',
      subTitle: '',
      cssClass: ' inquiryDelete',
      buttons: [
        {
          text: '삭제',
          handler: () => {
            this.store.dispatch(new InquiryActions.InquiryDelete(this.inquiryId));
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

  back() {
    this.store.dispatch(new RouterActions.Back());
  }
}
