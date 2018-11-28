import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {Inquiry} from '../../../core/model/inquiry';
import {AppStore} from '../../../app-store.interface';

import * as InquiryActions from '../../../core/redux/inquiry/action';

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

  }

  save() {
    console.log(this.inquiry);
    this.store.dispatch(new InquiryActions.InquiryAdd(this.inquiry));
  }
}
