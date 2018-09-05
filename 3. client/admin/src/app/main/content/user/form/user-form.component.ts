import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppStore} from '../../../../app-store.interface';
import {fuseAnimations} from '../../../../core/animations';

@Component({
  selector: 'user-form',
  styleUrls: ['./user-form.component.scss'],
  templateUrl: './user-form.component.html',
  animations: fuseAnimations
})
export class UserFormComponent implements OnInit, OnDestroy {


  constructor(private store: Store<AppStore>, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  addUser(): void {

  }

  modifyUser(): void {

  }

}
