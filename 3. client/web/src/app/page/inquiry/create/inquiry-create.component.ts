import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {Inquiry} from '../../../core/model/inquiry';
import {AppStore} from '../../../app-store.interface';
import * as InquiryActions from '../redux/inquiry.action';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-inquiry-create',
  templateUrl: './inquiry-create.component.html',
  styleUrls: ['./inquiry-create.component.scss']
})
export class InquiryCreateComponent implements OnInit {

  private inquiry: Inquiry;

  constructor(private store: Store<AppStore>, private router: Router, private location: Location) {
    this.inquiry = new Inquiry();
  }

  ngOnInit() {
    const file = document.getElementById('inquiry-create-file');
    Observable.fromEvent(file, 'change')
      .subscribe((event: any) => {
        this.inquiry.file = event.target.files[0];
      });

    const link = document.getElementById('link');
    Observable.fromEvent(link, 'click')
      .subscribe((event: any) => {
        if (!event.target.value) {
          this.inquiry.link = 'https://www.'
        }
      })
  }

  setInquiry () {
    if (!this.inquiry.title || !this.inquiry.question) {
      alert('제목 또는 내용이 입력되어 있지 않습니다.');
      return false;
    }
    this.store.dispatch(new InquiryActions.InquiryAdd(this.inquiry));
  }

  addFile() {
    document.getElementById('inquiry-create-file').click();
  }

  cancel (): void {
    this.location.back();
  }
}
