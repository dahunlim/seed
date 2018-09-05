import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Notice} from '../../../../core/models/notice';
import {AppStore} from '../../../../app-store.interface';
import {Store} from '@ngrx/store';

import * as NoticeActions from '../../../../core/redux/notice/notice.action';
import * as RouterActions from '../../../../core/router/router.action';
import {fuseAnimations} from '../../../../core/animations';
import {SelectionModel} from '@angular/cdk/collections';
import {getNotices, getTotal} from '../../../../core/redux/notice/notice.selector';

@Component({
  selector: 'notice-list',
  styleUrls: ['./notice-list.component.scss'],
  templateUrl: './notice-list.component.html',
  animations : fuseAnimations
})
export class NoticeListComponent implements OnInit, OnDestroy, AfterViewInit {

  pageIndex: number = 0;
  pageSize: number = 10;

  keyword: string;
  totalCount: number;
  displayedColumns = ['select', 'title', 'date'];
  dataSource: MatTableDataSource<Notice>;
  selectionModel: SelectionModel<Notice>;

  notices$: any;
  total$: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store<AppStore>) {
    this.selectionModel = new SelectionModel<Notice>(false);
  }

  ngOnInit(): void {
    this.notices$ = this.store.select(getNotices).subscribe(notices => {
      const noticeArr: Notice[] = [];
      notices.forEach(notice => noticeArr.push(notice));
      this.dataSource = new MatTableDataSource<Notice>(noticeArr);
      this.selectionModel.clear();
    });
    this.total$ = this.store.select(getTotal).subscribe(total => this.totalCount = total);
    this.store.dispatch(new NoticeActions.NoticeGetList(0, 10));
    this.store.dispatch(new NoticeActions.NoticeSelectCancel());
  }

  ngAfterViewInit()
  {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.notices$.unsubscribe();
    this.total$.unsubscribe();
  }

  selectNotice(notice: Notice){
    this.store.dispatch(new NoticeActions.NoticeSelect(notice));
    this.store.dispatch(new RouterActions.Go({path: ['/notice/view']}));
  }

  deleteNotice(): void {
    const reloadAction: NoticeActions.NoticeGetList = new NoticeActions.NoticeGetList(this.pageIndex * this.pageSize, this.pageSize, this.keyword);
    let selectedItem: Notice;
    this.selectionModel.selected.forEach(notice => selectedItem = notice);
    this.store.dispatch(new NoticeActions.NoticeDelete(selectedItem, reloadAction));
  }

  changePage(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.store.dispatch(new NoticeActions.NoticeGetList(event.pageIndex * event.pageSize, event.pageSize, this.keyword));
  }

  search(keyword) {
    this.store.dispatch(new NoticeActions.NoticeGetList(0, this.pageSize, keyword));
  }

  isAllSelected(): boolean {
    const numSelected = this.selectionModel.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    if (this.isAllSelected()){
      this.selectionModel.clear();
    } else {
      this.dataSource.data.forEach((notice) => this.selectionModel.select(notice));
    }
  }
}
