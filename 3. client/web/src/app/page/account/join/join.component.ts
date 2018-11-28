import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/Rx';
import {Store} from '@ngrx/store';
import {AppStore} from '../../../app-store.interface';
import * as AccountActions from '../../../core/redux/account/action';

import {Join} from '../../../core/model/join';
import {FormHelper} from "../../../core/helper/form";

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
})
export class JoinComponent implements OnInit {

  change$: any;

  joinFormErrors: any;
  joinForm: FormGroup;

  join: Join;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppStore>
  ) {

    this.join = new Join();
    this.joinFormErrors = {
      id: {},
      pass: {},
      name: {},
      phone: {}
    };

    this.joinForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }

  ngOnInit () {
    this.change$ = FormHelper.formChangeHandler(this.joinForm, this.joinFormErrors);
  }

  register() {
    this.store.dispatch(new AccountActions.AccountJoin(this.join));
  }

}
