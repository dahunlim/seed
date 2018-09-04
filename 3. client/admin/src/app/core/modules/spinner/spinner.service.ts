import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SpinnerService {

  public inProgress: Subject<boolean>;

  constructor() {
    this.inProgress = new Subject<boolean>();
  }

  start() {
    console.log('spinner start');
    this.inProgress.next(true);
  }

  stop() {
    console.log('spinner stop');
    this.inProgress.next(false);
  }
}
