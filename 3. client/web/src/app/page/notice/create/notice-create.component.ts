import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import 'rxjs/Rx';

import * as NoticeActions from '../redux/notice.action';
import {Notice} from '../../../core/model/notice';
import {AppStore} from '../../../app-store.interface';

@Component({
  selector: 'app-notice-create',
  templateUrl: './notice-create.component.html',
  styleUrls: ['./notice-create.component.scss']
})
export class NoticeCreateComponent implements OnInit {
  title: string;
  contents: string;
  file: File;
  link: string;

  constructor(private store: Store<AppStore>, private router: Router) { }

  ngOnInit() {
    /*const file = document.getElementById('notice-create-file');
    Observable.fromEvent(file, 'change')
      .subscribe((event: any) => {
        this.file = event.target.files[0];
      });*/
  }

  addFile() {
    document.getElementById('notice-create-file').click();
  }

  save() {
    this.store.dispatch(new NoticeActions.NoticeAdd(new Notice(this.title, this.contents)));
  }
}
