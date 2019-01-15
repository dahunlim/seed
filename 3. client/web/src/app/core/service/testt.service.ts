import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class TesttService {

  globalVar: number;
  globalVarUpdate: Observable<string>;
  globalVarObserver: Observer<number>;

  constructor() {
    console.log(this.globalVar);
    this.globalVarUpdate = Observable.create((observer: Observer<number>) => {
      this.globalVarObserver = observer;
    });
  }

  updateGlobalVar(newValue: number) {
    this.globalVar = newValue;
    this.globalVarObserver.next(this.globalVar);
  }
}
