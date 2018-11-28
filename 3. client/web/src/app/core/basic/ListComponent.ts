import {BasicComponent} from './BasicComponent';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {OnInit, ViewChild} from '@angular/core';
import {IModel} from '../model/interface';
import {Action} from '@ngrx/store';

export abstract class ListComponent extends BasicComponent implements OnInit {

  keyword: string;
  pageIndex: number = 0;
  pageSize: number = 10;

  totalCount: number = 0;
  displayedColumns: string[] = [];

  dataSource: MatTableDataSource<IModel>;
  selectionModel: SelectionModel<IModel>;

  protected constructor(columns: string[], multipleSelection: boolean = false) {
    super();
    this.displayedColumns = columns;
    this.dataSource = new MatTableDataSource<IModel>();
    this.selectionModel = new SelectionModel<IModel>(multipleSelection);
  }

  abstract setSelector();
  abstract getList(pageIndex: number, pageSize: number, keyword?: string, ...additional: any[]);
  abstract selectItem(item: IModel);
  abstract delete();

  ngOnInit(): void {
    this.setSelector();
    this.getList(this.pageIndex, this.pageSize, this.keyword);
  }

  changePage(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getList(this.pageIndex, this.pageSize, this.keyword);
  }

  search() {
    this.pageIndex = 0;
    this.getList(this.pageIndex, this.pageSize, this.keyword);
  }

  isAllSelected(): boolean {
    const numSelected = this.selectionModel.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    if (this.isAllSelected()){
      this.selectionModel.clear();
    } else {
      this.dataSource.data.forEach((item) => this.selectionModel.select(item));
    }
  }
}
