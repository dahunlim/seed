import {Component, OnDestroy, OnInit} from '@angular/core';
import {fuseAnimations} from '../../../shared/animation/fuse.animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: fuseAnimations
})
export class DashboardComponent implements OnInit, OnDestroy {

  statistic$: any;
  statistic: {
    totalMemberCount: number,
    totalTourCount: number,
    totalStampCount: number,
    todayMemberCount: number,
    todayStampCount: number,
    todayExchangeCount: number
  } = {
    totalMemberCount: 0,
    totalTourCount: 0,
    totalStampCount: 0,
    todayMemberCount: 0,
    todayStampCount: 0,
    todayExchangeCount: 0
  };

  rankings$: any;
  rankings: {
    _id: string,
    name: string,
    count: number
  }[];

  constructor () {

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }
}
