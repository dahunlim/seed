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
  selector: 'notice-form',
  styleUrls: ['./notice-form.component.scss'],
  templateUrl: './notice-form.component.html',
  animations: fuseAnimations
})
export class NoticeFormComponent implements OnInit, OnDestroy {

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
  }

  ngOnDestroy(): void {
    this.subs$.forEach(sub$ => sub$.unsubscribe());
  }

  create(): void {
    const raw: any = this.form.getRawValue();
    const notice: Notice = new Notice(raw.title, raw.contents);
    this.store.dispatch(new NoticeActions.NoticeCreate(notice));
  }
}
