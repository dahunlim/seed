import * as RouterActions from '../core/redux/router/action';
import { Component, OnInit , Input } from '@angular/core';
import {AppStore} from '../app-store.interface';
import {Store} from '@ngrx/store';
import {TestcService} from "./testc.service";
import {Subject, Subscription} from "rxjs";
import {TestaComponent} from "./test/testa.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit {

  selected: any = '';

  subs: Subscription;

  constructor(private store: Store<AppStore>,
              private testcService: TestcService,
              private testaCompo: TestaComponent) {
    // this.subs = this.testaCompo.message().subscribe(sub => {this.selected = sub});
    console.log("@@@" + this.selected);
  }


  ngOnInit(): void{
    this.getTemp();
  }
  getTempTest(){
    return this.testcService.getTempTest();
  }

  getTemp(): void {
    this.testcService.setTemp("test")
      .subscribe(selected => this.selected = selected);
  }

  goToPage(str: string) {
    switch (str) {
      case 'home' :
        this.store.dispatch(new RouterActions.Go({path: ['/main/']}));
        break;
      case 'notice' :
        this.store.dispatch(new RouterActions.Go({path: ['/main/notice']}));
        break;
      case 'Inquiry' :
        this.store.dispatch(new RouterActions.Go({path: ['/main/inquiry']}));
        break;
      default :
        break;
    }
  }
}
