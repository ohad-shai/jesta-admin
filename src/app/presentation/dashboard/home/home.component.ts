import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { FavorObjectGQL } from 'src/app/data/graphql/objects/favor.object.gql';
import { UserModel } from 'src/app/data/models/user.model';
import { SnackBarUtil } from '../../_shared/utilities/snack-bar.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class DashboardHomeComponent implements OnInit {

  numOfUsers = 0;
  numOfRequestedFavors = 0;
  numOfOnProgressFavors = 0;
  numOfDoneFavors = 0;

  users: UserModel[] = [];
  tableUsersColumns: string[] = ['id', 'name', 'actions'];
  tableUsersDataSource = new MatTableDataSource<UserModel>();
  tableUsersLoading: boolean = false;

  favors: FavorObjectGQL[] = [];
  tableFavorsColumns: string[] = ['id', 'sourceAddress', 'dateCreated', 'actions'];
  tableFavorsDataSource = new MatTableDataSource<FavorObjectGQL>();
  tableFavorsLoading: boolean = false;

  public usersChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {}
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    datasets: {
      bar: {
        backgroundColor: "rgb(40, 167, 69, 0.6)",
        borderColor: "rgb(40, 167, 69, 0.6)",
        hoverBackgroundColor: "rgb(40, 167, 69, 0.9)",
        hoverBorderColor: "rgb(40, 167, 69, 0.9)",
      }
    }
  };
  public usersChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [] }
    ]
  };

  public favorsChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {}
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    datasets: {
      bar: {
        backgroundColor: "rgb(44, 138, 239, 0.6)",
        borderColor: "rgb(44, 138, 239, 0.6)",
        hoverBackgroundColor: "rgb(44, 138, 239, 0.9)",
        hoverBorderColor: "rgb(44, 138, 239, 0.9)",
      }
    }
  };
  public favorsChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [] }
    ]
  };

  constructor(
    private title: Title,
    private snackBar: SnackBarUtil,
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('ג\'סטה | ניהול | תקציר');

    this.tableUsersLoading = true;
    this.tableFavorsLoading = true;

    this.dashboardService.getDashboard().subscribe({
      next: (result) => {
        // Top Summary Counters:
        this.numOfUsers = result.data.getNumOfUsers;
        this.numOfRequestedFavors = result.data.getNumberOfRequestedJesta;
        this.numOfOnProgressFavors = result.data.getNumberOfOnProgressJesta;
        this.numOfDoneFavors = result.data.getNumberOfExecutedJesta;

        // 2 Big Charts:
        // Mock Data: [1, 3, 4, 6, 2, 5, 7, 5, 6, 9, 10, 14, 5, 9, 12, 18, 15, 16, 19, 22, 25, 15, 18, 20, 16, 22, 25, 28, 26, 32]
        // Server Data: result.data.getJestaRegistrationLastMonth.dataSets.reverse()
        this.usersChartData = {
          labels: result.data.getUsersRegistrationLastMonth.labels.map(x => x.substring(0, x.lastIndexOf('/'))).reverse(),
          datasets: [
            { data: result.data.getUsersRegistrationLastMonth.dataSets.reverse() }
          ]
        };
        this.favorsChartData = {
          labels: result.data.getJestaRegistrationLastMonth.labels.map(x => x.substring(0, x.lastIndexOf('/'))).reverse(),
          datasets: [
            { data: result.data.getJestaRegistrationLastMonth.dataSets.reverse() }
          ]
        };

        // 2 Tables:
        this.users = result.data.getAllUsers.map(x => new UserModel(x._id, x.firstName, x.lastName));
        this.tableUsersDataSource = new MatTableDataSource(this.users);
        this.tableUsersLoading = false;

        this.favors = result.data.getAllFavors.map(x => Object.assign(new FavorObjectGQL(), x));
        this.tableFavorsDataSource = new MatTableDataSource(this.favors);
        this.tableFavorsLoading = false;
      },
      error: (error) => {
        this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        this.tableUsersLoading = false;
        this.tableFavorsLoading = false;
      }
    });
  }

}
