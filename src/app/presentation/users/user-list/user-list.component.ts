import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { SnackBarUtil } from '../../_shared/utilities/snack-bar.util';
import { UserModel } from 'src/app/data/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  users: UserModel[] = [];
  tableColumns: string[] = ['id', 'name', 'actions'];
  tableDataSource = new MatTableDataSource<UserModel>();
  tableLoading: boolean = false;

  constructor(
    private title: Title,
    private snackBar: SnackBarUtil,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('ג\'סטה | ניהול | משתמשים');

    this.tableLoading = true;

    this.usersService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.tableDataSource = new MatTableDataSource(this.users);
        this.tableLoading = false;
      },
      error: (error) => {
        this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        this.tableLoading = false;
      }
    });
  }

}
