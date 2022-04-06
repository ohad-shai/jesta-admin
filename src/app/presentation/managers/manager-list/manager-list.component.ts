import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { SnackBarUtil } from '../../_shared/utilities/snack-bar.util';
import { ManagerModel } from 'src/app/data/models/manager.model';
import { ManagersService } from 'src/app/core/services/managers.service';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html'
})
export class ManagerListComponent implements OnInit {

  managers: ManagerModel[] = [];
  tableColumns: string[] = ['id', 'name', 'actions'];
  tableDataSource = new MatTableDataSource<ManagerModel>();
  tableLoading: boolean = false;

  constructor(
    private title: Title,
    private snackBar: SnackBarUtil,
    private managersService: ManagersService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('ג\'סטה | ניהול | מנהלים');

    this.tableLoading = true;

    this.managersService.getAllManagers().subscribe({
      next: (data) => {
        this.managers = data;
        this.tableDataSource = new MatTableDataSource(this.managers);
        this.tableLoading = false;
      },
      error: (error) => {
        this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        this.tableLoading = false;
      }
    });
  }

}
