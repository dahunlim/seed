import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class SpinnerService {
  inLoading: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  start(): void {
    this.inLoading.next(true);
  }

  stop(): void {
    this.inLoading.next(false);
  }
}
