import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import 'rxjs/Rx';

import * as NoticeActions from '../redux/notice.action';
import {Notice} from '../../../core/model/notice';
import {AppStore} from '../../../app-store.interface';
import {getResponse} from '../redux/notice.selector';

@Component({
  selector: 'app-notice-create',
  templateUrl: './notice-create.component.html',
  styleUrls: ['./notice-create.component.scss']
})
export class NoticeCreateComponent implements OnInit {
  title: string;
  content: string;
  file: File;
  link: string;

  constructor(private store: Store<AppStore>, private router: Router) { }

  ngOnInit() {
    const file = document.getElementById('notice-create-file');
    Observable.fromEvent(file, 'change')
      .subscribe((event: any) => {
        this.file = event.target.files[0];
      });

    const link = document.getElementById('link');
    Observable.fromEvent(link, 'click')
      .subscribe((event: any) => {
        if (!event.target.value) {
          this.link = 'https://www.'
        }
      })
  }

  addFile() {
    document.getElementById('notice-create-file').click();
  }

  save() {
    const notice = new Notice(this.title, this.content, this.file, this.link);

    if (!this.title || !this.content) {
      alert('제목 또는 내용이 입력되어 있지 않습니다.');
      return false;
    }

    this.store.dispatch(new NoticeActions.NoticeAdd(notice));
  }
}
