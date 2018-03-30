import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";
import * as RouterActions from "../../../core/router/router.action";
import * as InquiryActions from "../redux/inquiry.action";
import {Store} from "@ngrx/store";
import {AppStore} from "../../../app-store.interface";
import {getInquiryList} from "../redux/inquiry.selector";

@IonicPage({
  name: 'InquiryListComponent',
  segment: 'inquiry/list'
})
@Component({
  selector: 'page-inquiry-ionic',
  templateUrl: './inquiry-list.component.html'
})
export class InquiryListComponent {
  private inquiry$: any;
  constructor(private store: Store<AppStore>) {

  }

  ionViewDidLoad() {
    this.inquiry$ = this.store.select(getInquiryList);
  }

  ionViewDidEnter() {
    this.store.dispatch(new InquiryActions.InquiryGetList(0, 999));
  }

  goToPage(str: string, inquiryId: string) {
    switch (str) {
      case 'detail' :
        this.store.dispatch(new RouterActions.Go('InquiryDetailComponent', {inquiryId : inquiryId}));
        break;
      case 'create' :
        this.store.dispatch(new RouterActions.Go('InquiryCreateComponent'));
        break;
    }
  }

  back() {
    this.store.dispatch(new RouterActions.Back());
  }
}
