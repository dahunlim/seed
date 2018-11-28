import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {AppStore} from '../../../app-store.interface';
import {Inquiry} from '../../../core/model/inquiry';
import {getSelectedInquiry} from '../../../core/redux/inquiry/selector';

import * as InquiryActions from '../../../core/redux/inquiry/action';

@Component({
  selector: 'app-inquiry-detail',
  templateUrl: 'inquiry-detail.component.html',
  styleUrls: ['inquiry-detail.component.scss']
})
export class InquiryDetailComponent implements OnInit {

  private inquiry$: Observable<Inquiry>;
  private inquiry: Inquiry;
  private params: any;

  constructor(private store: Store<AppStore>, private route: ActivatedRoute) {
    this.inquiry = new Inquiry();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.params = params;
      this.store.dispatch(new InquiryActions.InquiryGetDetail(params['inquiryID']));

      this.inquiry$ = this.store.select(getSelectedInquiry);
      this.inquiry$.subscribe(inquiry => {
        if (!!inquiry && inquiry._id === params['inquiryID']) {
          this.inquiry = inquiry;
        }
      });
    })
  }

  downloadFile(state: number) {
    this.inquiry$.subscribe(res => {
      switch (state) {
        case 1:
          this.store.dispatch(new InquiryActions.InquiryFileDownload(res.file['key'], res.file['name']));
          break;
        case 2:
          this.store.dispatch(new InquiryActions.InquiryFileDownload(res.answer['file']['key'], res.answer['file']['name']));
          break;
      }
    })
  }
}
