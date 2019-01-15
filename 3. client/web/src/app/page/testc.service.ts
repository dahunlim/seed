import {Injectable, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {of} from "rxjs";

@Injectable()
export class TestcService {
  temp: string = 'test';

  constructor() {

  }
  getTempTest() {
    return this.temp;
  }
  getTemp(): Observable<string> {
    console.log("get " + this.temp);
    return of(this.temp);
  }

  setTemp(input): Observable<string> {
    if (input !== 'test') {
      this.temp = input;
      console.log("hello" + this.temp);
    }
    return of(this.temp);
  }

}
