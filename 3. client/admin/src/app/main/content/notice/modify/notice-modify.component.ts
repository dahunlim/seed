import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppStore} from '../../../../app-store.interface';

import * as NoticeActions from '../redux/notice.action';
import * as RouterActions from '../../../../core/router/router.action';
import {Notice} from '../../../../core/models/notice';
import {fuseAnimations} from '../../../../core/animations';
import {FormHelper} from '../../../../core/helpers/form';
import {getSelectedNotice} from '../redux/notice.selector';

@Component({
  selector: 'notice-modify',
  styleUrls: ['./notice-modify.component.scss'],
  templateUrl: './notice-modify.component.html',
  animations: fuseAnimations
})
export class NoticeModifyComponent implements OnInit, OnDestroy {

  form: FormGroup;
  formErrors: any;
  notice: Notice;

  subs$: any[] = [];

  constructor(private store: Store<AppStore>, private formBuilder: FormBuilder) {

    this.formErrors = {
      title: {},
      contents: {}
    };
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      contents: ['', Validators.required]
    });

    this.subs$.push(
      FormHelper.formChangeHandler(this.form, this.formErrors)
    );

    this.subs$.push(
      this.store.select(getSelectedNotice).subscribe(notice => {
        if (notice) {
          this.notice = notice;
          FormHelper.setValueFromInstance(this.form, notice);
        } else {
          this.store.dispatch(new RouterActions.Back());
        }
      })
    );

  }

  ngOnDestroy(): void {
    this.subs$.forEach(sub$ => sub$.unsubscribe());
  }

  modify(): void {
    const raw: any = this.form.getRawValue();
    const notice: Notice = new Notice(raw.title, raw.contents, this.notice._id, this.notice.date);
    this.store.dispatch(new NoticeActions.NoticeModify(notice));
  }
}
