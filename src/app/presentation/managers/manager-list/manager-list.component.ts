import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { SnackBarUtil } from '../../_shared/utilities/snack-bar.util';
import { UsersService } from 'src/app/core/services/users.service';
import { ManagerModel } from 'src/app/data/models/manager.model';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html'
})
export class ManagerListComponent implements OnInit {

  managers: Array<ManagerModel> = [];
  tableColumns: string[] = ['id', 'name', 'actions'];
  tableDataSource = new MatTableDataSource<ManagerModel>();
  tableLoading: boolean = false;

  constructor(
    private titleService: Title,
    private snackBar: SnackBarUtil,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('ג\'סטה | ניהול | מנהלים');

    this.tableLoading = true;

    this.usersService.getManagers().subscribe({
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
