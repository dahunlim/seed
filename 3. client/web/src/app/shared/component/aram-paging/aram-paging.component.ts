/**
 * Date : 2017. 12. 05.
 * Create : Dong Gyu
 */
import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-aram-paging',
  templateUrl: './aram-paging.component.html',
  styleUrls: ['./aram-paging.component.scss']
})
export class AramPagingComponent implements OnInit, OnChanges {
  @Input('total') total: Observable<number>;
  @Input('curPage') curPage: number;
  @Input('step') step: number;
  @Input('maxSize') maxSize: number;
  @Input('URL') URL: string;

  private pageObj: number[];
  private lastPage: number;

  constructor( private router: Router )  {
    // console.log('aram page component constructor');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('OnChange : ' + changes);
  }

  ngOnInit() {

    this.total.subscribe(totalPage => {
      this.lastPage = Math.ceil(totalPage / this.step);
      // console.log(this.lastPage);
      this.paging(this.curPage);
    });

    // prev
    const prevBt = document.querySelector('.left-arrow');
    Observable.fromEvent(prevBt, 'click')
      .subscribe(() => {
        if (+this.curPage !== 1) {
          this.router.navigate([this.URL + (this.curPage - 1)]);
          this.paging(this.curPage - 1);
        }
      });

    // prevJump
    const prevDotBt = document.querySelector('.left-dot');
    Observable.fromEvent(prevDotBt, 'click')
      .subscribe(() => {
        if (+this.curPage > this.maxSize) {
          this.router.navigate([this.URL + (this.curPage - this.maxSize)]);
          this.paging(this.curPage - this.maxSize);
        }
      });

    // nextJump
    const nextDotBt = document.querySelector('.right-dot');
    Observable.fromEvent(nextDotBt, 'click')
      .subscribe(() => {
        // console.log((this.lastPage - this.curPage))
        if (this.lastPage - this.curPage >= this.maxSize) {
          this.router.navigate([this.URL + (+this.curPage + this.maxSize)]);
          this.paging(+this.curPage + this.maxSize);
        }
      });

    // next
    const nextBt = document.querySelector('.right-arrow');
    Observable.fromEvent(nextBt, 'click')
      .subscribe(() => {
        if (+this.curPage !== this.lastPage) {
          this.router.navigate([this.URL + (+this.curPage + 1)]);
          this.paging(+this.curPage + 1);
        }
      });
  }

  paging(curPage: number) {
    this.pageObj = [];
    let count = 0;
    if (curPage === 1) {
      for (let i = curPage; i <= this.lastPage; i++ ) {
        this.pageObj.push(i);
        count++;
        if (count >= this.maxSize) {
          // return false;
          break;
        }
      }
    } else {
      for (let i = curPage - (curPage < (Math.floor(this.maxSize / 2) + 1) ?
        curPage - 1 : Math.floor(this.maxSize / 2)); i <= this.lastPage; i++ ) {
        this.pageObj.push(i);
        count++;
        if (count >= this.maxSize) {
          // return false;
          break;
        }
      }
    }
  }

  goToPage(num: number) {
    this.router.navigate([this.URL + num]);
    this.paging(num);
  }
}
