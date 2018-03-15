import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

declare var daum: any;
@Injectable()
export class DaumService {
  constructor() { }
  findAddress(): Observable<any> {
    return Observable.create(function(observer){
      new daum.Postcode({
        oncomplete: data => {
          observer.next(data);
          observer.complete();
        }
      }).open();
    })
  }
}
