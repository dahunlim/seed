import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {Inquiry} from '../../../core/model/inquiry';
import {AppStore} from '../../../app-store.interface';

import * as InquiryActions from '../../../core/redux/inquiry/action';
import {getSelectedInquiry} from '../../../core/redux/inquiry/selector';

@Component({
  selector: 'app-inquiry-reply',
  templateUrl: './inquiry-reply.component.html',
  styleUrls: ['./inquiry-reply.component.scss']
})
export class InquiryReplyComponent implements OnInit, OnDestroy {

  private inquiry$: Observable<Inquiry>;
  private inquiry: Inquiry;
  private detailSub: any;

  constructor(private store: Store<AppStore>, private route: ActivatedRoute, private router: Router) {
    this.inquiry = new Inquiry();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new InquiryActions.InquiryGetDetail(params['inquiryID']));

      this.inquiry$ = this.store.select(getSelectedInquiry);
      this.detailSub = this.inquiry$
        .filter(data => !!data)
        .subscribe(inquiry => {
          this.inquiry = inquiry;
        // if (!!inquiry && inquiry._id === params['inquiryID']) {
        //   this.inquiry = inquiry;
        // }
      }).unsubscribe();
    });

    const file = document.getElementById('inquiry-reply-file');
    Observable.fromEvent(file, 'change')
      .subscribe((event: any) => {
        this.inquiry.answer.file = event.target.files[0];
      });

    const link = document.getElementById('link');
    Observable.fromEvent(link, 'click')
      .filter(data => !data)
      .subscribe((event: any) => {
          this.inquiry.answer.link = 'https://www.'
      })
  }

  addFile(): void {
    document.getElementById('inquiry-reply-file').click();
  }

  downloadFile(): void {
    this.inquiry$.subscribe(res => {
      this.store.dispatch(new InquiryActions.InquiryFileDownload(res.file['key'], res.file['name']));
    })
  }

  setAnswer() {
    if (!this.inquiry.answer.contents) {
      alert('답변 내용을 작성해주세요');
      return false;
    }
    this.store.dispatch(new InquiryActions.InquiryModify(this.inquiry));
  }

  ngOnDestroy(): void {
    // this.detailSub.unsubscribe();
  }
}

