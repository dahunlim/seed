import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Store} from '@ngrx/store';
import {AppStore} from '../../../../app-store.interface';
import * as UserActions from '../../../../core/redux/user/user.action';
import * as RouterActions from '../../../../core/router/router.action';
import {User} from '../../../../core/models/user';
import {fuseAnimations} from '../../../../core/animations';
import {SelectionModel} from '@angular/cdk/collections';
import {getUsers, getUserTotal} from '../../../../core/redux/user/user.selector';


@Component({
  selector: 'user-list',
  styleUrls: ['./user-list.component.scss'],
  templateUrl: './user-list.component.html',
  animations: fuseAnimations
})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy{

  keyword: string;
  pageIndex: number = 0;
  pageSize: number = 10;

  totalCount: number = 0;
  displayedColumns = ['select', 'id', 'name', 'level', 'state', 'date'];
  dataSource: MatTableDataSource<User>;
  selectionModel: SelectionModel<User>;

  users$: any;
  total$: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store<AppStore>) {
    this.dataSource = new MatTableDataSource<User>();
    this.selectionModel = new SelectionModel<User>(true);
  }

  ngOnInit(): void {
    this.users$ = this.store.select(getUsers).subscribe(users => {
      const userArr = [];
      users.forEach(user => userArr.push(user));
      this.dataSource.data = userArr;
      this.selectionModel.clear();
    });
    this.total$ = this.store.select(getUserTotal).subscribe(total => this.totalCount = total);
    this.store.dispatch(new UserActions.UserGetList(0, 10));
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.users$.unsubscribe();
    this.total$.unsubscribe();
  }

  selectUser(user: User): void {
    this.store.dispatch(new UserActions.UserSelect(user));
    this.store.dispatch(new RouterActions.Go({path: ['/user/form']}));
  }

  changePage(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.store.dispatch(new UserActions.UserGetList(event.pageIndex * event.pageSize, event.pageSize, this.keyword));
  }

  search(keyword) {
    this.store.dispatch(new UserActions.UserGetList(0, this.pageSize, keyword));
  }

  // 삭제는 추후 구현
  deleteUser(): void {

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
      this.dataSource.data.forEach((user) => this.selectionModel.select(user));
    }
  }
}

