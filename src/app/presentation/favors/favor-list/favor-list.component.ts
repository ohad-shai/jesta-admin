import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { SnackBarUtil } from '../../_shared/utilities/snack-bar.util';
import { FavorsService } from 'src/app/core/services/favors.service';
import { FavorObjectGQL } from 'src/app/data/graphql/objects/favor.object.gql';

@Component({
  selector: 'app-favor-list',
  templateUrl: './favor-list.component.html'
})
export class FavorListComponent implements OnInit {

  favors: FavorObjectGQL[] = [];
  tableColumns: string[] = ['id', 'sourceAddress', 'dateCreated', 'actions'];
  tableDataSource = new MatTableDataSource<FavorObjectGQL>();
  tableLoading: boolean = false;

  constructor(
    private title: Title,
    private snackBar: SnackBarUtil,
    private favorsService: FavorsService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('ג\'סטה | ניהול | ג\'סטות');

    this.tableLoading = true;

    this.favorsService.getAllFavors().subscribe({
      next: (data) => {
        this.favors = data;
        this.tableDataSource = new MatTableDataSource(this.favors);
        this.tableLoading = false;
      },
      error: (error) => {
        this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        this.tableLoading = false;
      }
    });
  }

}
