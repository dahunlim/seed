import { Component, OnInit } from "@angular/core";
import { TestcService } from "../testc.service";
import {Subject} from "rxjs";
import {TestService} from "../../core/api/test.service";
import {IResponse} from "../../core/service/response.service";
import {HttpService} from "../../core/service/http.service";
import {Config} from "protractor";
import {HttpResponse} from "@angular/common/http";

@Component({
    selector : 'app-testa',
    templateUrl : './testa.component.html',
    styleUrls : ['./testa.component.scss'],
})

export class TestaComponent implements OnInit{
  num: number = 0;
  cname: string = "A compo";
  public sub  = new Subject<string>();
  datas: any;

  constructor(private testcService: TestcService,
              private testService: TestService,
              private httpService: HttpService) {


    // const res = this.testService.list(1, 1)
    //   .subscribe((data: IResponse<any>) => console.log(data));
    this.get();
    // this.httpService.post("test",{id: "LDH_2", title: "wewe", contents: "wewewe"})
    //   .subscribe(data => console.log(data));
    this.testService.data("LDH_1", "wewe", "wewe")
      .subscribe((data: IResponse<any>) => console.log(data));

  }

  ngOnInit() {
    this.set();
  }

  message<String>() {
    this.sub.next(this.cname);
  }

  get() {
    this.testService.list(10, 10)
      .subscribe((data) => {
        this.datas = Object(data);
        console.log(this.datas);
      });
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

