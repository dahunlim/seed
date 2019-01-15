import { Component, OnInit } from "@angular/core";
import {TestcService} from "../testc.service";
import {Subject} from "rxjs";

@Component({
    selector : 'app-testb',
    templateUrl : './testb.component.html',
    styleUrls : ['./testb.component.scss'],
})

export class TestbComponent implements OnInit{
  num: number = 0;
  cname: string = "B component!!!!";
  public sub = new Subject();

  constructor(private testcService: TestcService){
    this.sub.next(this.cname);
  }

  ngOnInit() {
    this.set();
  }
  set() {
    this.testcService.setTemp(this.cname);
  }

  add() {
    this.num++;
  }

  subs() {
    this.num--;
  }

}

