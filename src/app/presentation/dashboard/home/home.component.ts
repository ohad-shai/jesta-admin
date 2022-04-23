import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UsersService } from 'src/app/core/services/users.service';
import { UserModel } from 'src/app/data/models/user.model';
import { SnackBarUtil } from '../../_shared/utilities/snack-bar.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class DashboardHomeComponent implements OnInit {

  users: UserModel[] = [];
  tableUsersColumns: string[] = ['id', 'name', 'actions'];
  tableUsersDataSource = new MatTableDataSource<UserModel>();
  tableUsersLoading: boolean = false;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    }
  };
  public barChartData: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ]
  };

  constructor(
    private title: Title,
    private snackBar: SnackBarUtil,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('ג\'סטה | ניהול | תקציר');

    this.tableUsersLoading = true;
    this.tableUsersLoading = true;

    this.usersService.getAllClients().subscribe({
      next: (data) => {
        this.users = data;
        this.tableUsersDataSource = new MatTableDataSource(this.users);
        this.tableUsersLoading = false;
      },
      error: (error) => {
        this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        this.tableUsersLoading = false;
      }
    });
  }

}
