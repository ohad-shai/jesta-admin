import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarUtil } from '../../_shared/utilities/snack-bar.util';
import { MultiComponent } from '../../_shared/objects/multi-component';
import { ComponentMode } from '../../_shared/objects/component-mode';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorId } from 'src/app/data/utilities/error-id';
import { CategoryObjectGQL } from 'src/app/data/graphql/objects/category.object.gql';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent extends MultiComponent implements OnInit {

  initialLoading: boolean = false;
  category: CategoryObjectGQL = new CategoryObjectGQL();
  form!: FormGroup;
  formLoading: boolean = false;
  primaryCategories: CategoryObjectGQL[] = [];

  constructor(
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: SnackBarUtil,
    private categoriesService: CategoriesService,
  ) { super(); }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.mode = <ComponentMode>data["mode"];
      if (this.mode == undefined) throw new Error("The route does not include the \"mode\" data property.");

      this.form = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        parentCategory: new FormControl(''),
      });

      this.categoriesService.getAllPrimaryCategories().subscribe({
        next: (data) => {
          this.primaryCategories = data;
        },
        error: (error) => {
          this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        }
      });

      if (!this.isCreateMode()) {
        this.route.params.subscribe(params => {
          // Gets the category from the server:
          this.initialLoading = true;
          this.categoriesService.getCategoryById(params["id"]).subscribe({
            next: (data) => {
              this.category = data;
              this.form.controls["name"].setValue(this.category.name);
              this.form.controls["parentCategory"].setValue(this.category.parentCategory?._id);
              this.title.setTitle('ג\'סטה | ניהול | קטגוריות | ' + this.category.getFullName());
              this.initialLoading = false;
            },
            error: (error) => {
              this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
              this.initialLoading = false;
            }
          });
        });
      }
    });
  }

  performCreate() {
    if (this.form.invalid || this.formLoading) return;

    this.formLoading = true;

    const name = this.form.controls['name'].value;
    const parentCategory = (this.form.controls['parentCategory'].value ? this.form.controls['parentCategory'].value : null);

    this.categoriesService.createCategory(name, parentCategory).subscribe({
      next: () => {
        this.router.navigate(['/categories']);
        this.snackBar.show("הקטגוריה נוספה בהצלחה");
        this.formLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        if (error.message.includes(ErrorId.Exists)) {
          this.snackBar.show("שם הקטגוריה כבר תפוס");
        } else {
          this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        }
        this.formLoading = false;
      }
    });
  }

  performUpdate() {
    if (this.form.invalid || this.formLoading) return;

    this.formLoading = true;

    const name = this.form.controls['name'].value;
    const newParentCategoryId = (this.form.controls['parentCategory'].value ? this.form.controls['parentCategory'].value : null);

    this.categoriesService.updateCategory(this.category.name!, name, newParentCategoryId).subscribe({
      next: (result) => {
        this.router.navigate(['/categories/' + this.category._id]);
        this.snackBar.show("הקטגוריה עודכנה בהצלחה");
        this.formLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        if (error.message.includes(ErrorId.Exists)) {
          this.snackBar.show("שם הקטגוריה כבר תפוס");
        } else {
          this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        }
        this.formLoading = false;
      }
    });
  }

  performDelete() {
    if (this.formLoading) return;

    this.formLoading = true;
    this.categoriesService.deleteCategory(this.category.name!).subscribe({
      next: () => {
        this.router.navigate(['/categories']);
        this.snackBar.show("הקטגוריה נמחקה בהצלחה");
        this.formLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        if (error.message.includes(ErrorId.NotExists)) {
          this.router.navigate(['/categories']);
          this.snackBar.show("הקטגוריה נמחקה בהצלחה");
        } else {
          this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        }
        this.formLoading = false;
      }
    });
  }

}
