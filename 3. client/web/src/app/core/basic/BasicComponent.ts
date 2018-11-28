import {OnDestroy} from '@angular/core';

export class BasicComponent implements OnDestroy {

  subs$: any[] = [];

  ngOnDestroy(): void {
    this.subs$.forEach(sub$ => sub$.unsubscribe());
  }
}
