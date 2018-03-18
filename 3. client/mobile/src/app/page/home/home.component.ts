import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";
import {Store} from "@ngrx/store";

import {AppStore} from "../../../app-store.interface";
import * as RouterActions from '../../../core/router/router.action';
import * as FreezerActions from "../freezer/redux/freezer.action";
import {getFreezerMe} from "../freezer/redux/freezer.selector";
import {AuthGuard} from "../../../core/guard/auth.guard";
import {SessionService} from "../../../core/service/session.service";

@IonicPage({
  name: 'HomeComponent',
  segment: 'home'
})
@Component({
  selector: 'page-home-ionic',
  templateUrl: 'home.component.html'
})
export class HomeComponent extends AuthGuard{
  private freezers$: any;
  private myFreezersID: any = [];
  private freeezerList$: any;
  private intervalReq: any;
  constructor(protected store: Store<AppStore>, protected sessionService: SessionService) {
    super(store, sessionService);
  }

  ionViewDidLoad() {
    this.freezers$ = this.store.select(getFreezerMe);
    this.store.dispatch(new FreezerActions.FreezerGetMe());
  }

  ionViewWillEnter() {
    this.freeezerList$ = this.store.select(getFreezerMe).subscribe(res => {
      if(!!res) {
        let ownFreezer = [];
        res.forEach(data => ownFreezer.push(data));
        for(let i in ownFreezer) {
          setTimeout(() => {
            this.myFreezersID[i] = ownFreezer[i].id;
            this.store.dispatch(new FreezerActions.FreezerGetListState(ownFreezer[i].id));
          }, (+i * 500))
        }
      }
    });
    this.intervalReq = setInterval(() => {
      for(let i in this.myFreezersID) {
        setTimeout(() => {
          this.store.dispatch(new FreezerActions.FreezerGetListState(this.myFreezersID[i]));
        }, (+i * 500))
      }
    }, 20000);
  }

  ionViewWillLeave() {
    clearInterval(this.intervalReq);
    this.freeezerList$.unsubscribe();
  }

  setStateColor(state){
    let str = 'danger';
    switch (state) {
      case 0: str = 'normal';
          break;
      case 2:
      case 4: str = 'warning';
          break;
      case 1:
      case 3:
      case 5: str = 'danger';
          break;
    }
    return str
  }

  goToPage(str: string, data?: string) {
    switch (str) {
      case 'alarm':
        this.store.dispatch(new RouterActions.Go('AlarmComponent'));
        break;
      case 'detail':
        this.store.dispatch(new RouterActions.Go('FreezerDetailComponent', {id: data}));
        break;
      case 'mypage':
        this.store.dispatch(new RouterActions.Go('MypageMainComponent'));
        break;
      case 'signin': // 임시
        this.store.dispatch(new RouterActions.Go('SigninComponent'));
        break;
      default :
        alert('확인이 필요한 값 : ' + str);
    }
  }
}
