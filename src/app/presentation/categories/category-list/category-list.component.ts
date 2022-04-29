import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { SnackBarUtil } from '../../_shared/utilities/snack-bar.util';
import { CategoryObjectGQL } from 'src/app/data/graphql/objects/category.object.gql';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {

  categories: CategoryObjectGQL[] = [];
  tableColumns: string[] = ['id', 'name', 'actions'];
  tableDataSource = new MatTableDataSource<CategoryObjectGQL>();
  tableLoading: boolean = false;

  constructor(
    private title: Title,
    private snackBar: SnackBarUtil,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('ג\'סטה | ניהול | קטגוריות');

    this.tableLoading = true;

    this.categoriesService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.tableDataSource = new MatTableDataSource(this.categories);
        this.tableLoading = false;
      },
      error: (error) => {
        this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        this.tableLoading = false;
      }
    });
  }

}
