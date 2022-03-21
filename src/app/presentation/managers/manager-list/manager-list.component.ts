import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ManagerModel } from 'src/app/domain/models/manager.model';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html'
})
export class ManagerListComponent implements OnInit {

  managers!: Array<ManagerModel>;
  tableColumns: string[] = ['id', 'name', 'actions'];
  tableDataSource = new MatTableDataSource<ManagerModel>();
  tableLoading: boolean = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('ג\'סטה | ניהול | מנהלים');

    // On sort change: resets back to the first page:
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // TODO: get from API:
    this.managers = [
      { id: 1, name: 'ישראל ישראלי' },
      { id: 2, name: 'שם 1' },
      { id: 3, name: 'שם 2' },
      { id: 4, name: 'שם 3' },
      { id: 5, name: 'שם 4' },
      { id: 6, name: 'שם 5' },
      { id: 7, name: 'שם 6' },
      { id: 8, name: 'שם 7' },
      { id: 9, name: 'שם 8' },
      { id: 10, name: 'שם 9' },
      { id: 11, name: 'שם 10' },
    ];
    this.tableDataSource = new MatTableDataSource(this.managers);
    this.tableDataSource.sort = this.sort;
    this.tableDataSource.paginator = this.paginator;
  }

}
