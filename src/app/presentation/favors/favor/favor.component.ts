import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarUtil } from '../../_shared/utilities/snack-bar.util';
import { MultiComponent } from '../../_shared/objects/multi-component';
import { ComponentMode } from '../../_shared/objects/component-mode';
import { ValidationBundles } from '../../_shared/validators/validation-bundles';
import { equals } from '../../_shared/validators/equals.validator';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorId } from 'src/app/data/utilities/error-id';
import { FavorsService } from 'src/app/core/services/favors.service';
import { PopulatedFavorObjectGQL } from 'src/app/data/graphql/objects/populated-favor.object.gql';
import { FavorInputGQL } from 'src/app/data/graphql/inputs/favor.input.gql';
import { UpdateFavorInputGQL } from 'src/app/data/graphql/inputs/update-favor.input.gql';

@Component({
  selector: 'app-favor',
  templateUrl: './favor.component.html'
})
export class FavorComponent extends MultiComponent implements OnInit {

  initialLoading: boolean = false;
  favor: PopulatedFavorObjectGQL = new PopulatedFavorObjectGQL();
  form!: FormGroup;
  formLoading: boolean = false;

  constructor(
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: SnackBarUtil,
    private favorsService: FavorsService,
  ) { super(); }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.mode = <ComponentMode>data["mode"];
      if (this.mode == undefined) throw new Error("The route does not include the \"mode\" data property.");

      if (this.isCreateMode()) {
        this.form = new FormGroup({
          firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
          lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
          email: new FormControl('', ValidationBundles.emailRequired()),
          password: new FormControl('', ValidationBundles.passwordRequired()),
          passwordConfirm: new FormControl('', ValidationBundles.passwordRequired())
        }, { validators: [equals('passwordConfirm', 'password')] });
      } else if (this.isUpdateMode()) {
        this.form = new FormGroup({
          firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
          lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
          email: new FormControl('', ValidationBundles.emailRequired()),
          password: new FormControl('', ValidationBundles.password()),
          passwordConfirm: new FormControl('', ValidationBundles.password())
        }, { validators: [equals('passwordConfirm', 'password')] });
      } else {
        this.form = new FormGroup({
          firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
          lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
          email: new FormControl('', ValidationBundles.email()),
        });
      }

      if (!this.isCreateMode()) {
        this.route.params.subscribe(params => {
          // Gets the favor from the server:
          this.initialLoading = true;
          this.favorsService.getFavorById(params["id"]).subscribe({
            next: (data) => {
              this.favor = data;
              // this.form.controls["firstName"].setValue(this.favor.firstName);
              // this.form.controls["lastName"].setValue(this.favor.lastName);
              // this.form.controls["email"].setValue(this.favor.email);
              this.title.setTitle('ג\'סטה | ניהול | ' + this.favor.getCategoriesTitle());
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
    this.favorsService.createFavor(<FavorInputGQL>{
      // firstName: this.form.controls['firstName'].value,
      // lastName: this.form.controls['lastName'].value,
      // email: this.form.controls['email'].value.toLowerCase(),
      // password: this.form.controls['password'].value,
    }).subscribe({
      next: () => {
        this.router.navigate(['/favors']);
        this.snackBar.show("הג\'סטה נוספה בהצלחה");
        this.formLoading = false;
      },
      error: (error) => {
        this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        this.formLoading = false;
      }
    });
  }

  performUpdate() {
    if (this.form.invalid || this.formLoading) return;

    this.formLoading = true;
    this.favorsService.updateFavor(this.favor._id!, <UpdateFavorInputGQL>{
      // id: this.favor.id,
      // firstName: this.form.controls['firstName'].value,
      // lastName: this.form.controls['lastName'].value,
      // email: this.form.controls['email'].value.toLowerCase(),
      // password: (this.form.controls['password'].value ? this.form.controls['password'].value : undefined),
    }).subscribe({
      next: (result) => {
        this.router.navigate(['/favors/' + this.favor._id!]);
        this.snackBar.show("הג\'סטה עודכנה בהצלחה");
        this.formLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        this.formLoading = false;
      }
    });
  }

  performDelete() {
    if (this.formLoading) return;

    this.formLoading = true;
    this.favorsService.deleteFavor(this.favor._id!).subscribe({
      next: () => {
        this.router.navigate(['/favors']);
        this.snackBar.show("הג\'סטה נמחקה בהצלחה");
        this.formLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        if (error.message.includes(ErrorId.NotExists)) {
          this.router.navigate(['/favors']);
          this.snackBar.show("הג\'סטה נמחקה בהצלחה");
        } else {
          this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        }
        this.formLoading = false;
      }
    });
  }

}
