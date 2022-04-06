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
import { UserModel } from 'src/app/data/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent extends MultiComponent implements OnInit {

  initialLoading: boolean = false;
  user: UserModel = new UserModel();
  form!: FormGroup;
  formLoading: boolean = false;

  constructor(
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: SnackBarUtil,
    private usersService: UsersService,
  ) { super(); }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.mode = <ComponentMode>data["mode"];
      if (this.mode == undefined) throw new Error("The route does not include the \"mode\" data property.");

      if (this.isCreateMode()) {
        this.form = new FormGroup({
          firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
          lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
          email: new FormControl('', ValidationBundles.emailRequired()), // TODO: check email in DB
          password: new FormControl('', ValidationBundles.passwordRequired()),
          passwordConfirm: new FormControl('', ValidationBundles.passwordRequired())
        }, { validators: [equals('passwordConfirm', 'password')] });
      } else if (this.isUpdateMode()) {
        this.form = new FormGroup({
          firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
          lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
          email: new FormControl('', ValidationBundles.emailRequired()), // TODO: check email in DB
          password: new FormControl('', ValidationBundles.password()),
          passwordConfirm: new FormControl('', ValidationBundles.password())
        }, { validators: [equals('passwordConfirm', 'password')] });
      } else {
        this.form = new FormGroup({
          firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
          lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
          email: new FormControl('', ValidationBundles.email()), // TODO: check email in DB
        });
      }

      if (!this.isCreateMode()) {
        this.route.params.subscribe(params => {
          // Gets the user from the server:
          this.initialLoading = true;
          this.usersService.getUserById(params["id"]).subscribe({
            next: (data) => {
              this.user = data;
              this.form.controls["firstName"].setValue(this.user.firstName);
              this.form.controls["lastName"].setValue(this.user.lastName);
              this.form.controls["email"].setValue(this.user.email);
              this.title.setTitle('ג\'סטה | ניהול | ' + this.user.getFullName());
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
    this.usersService.createUser(<UserModel>{
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      email: this.form.controls['email'].value.toLowerCase(),
      password: this.form.controls['password'].value,
    }).subscribe({
      next: () => {
        this.router.navigate(['/users']);
        this.snackBar.show("המשתמש נוסף בהצלחה");
        this.formLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        if (error.message.includes(ErrorId.Exists)) {
          this.snackBar.show("כתובת הדוא\"ל כבר תפוסה");
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
    this.usersService.updateUser(<UserModel>{
      id: this.user.id,
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      email: this.form.controls['email'].value.toLowerCase(),
      password: (this.form.controls['password'].value ? this.form.controls['password'].value : undefined),
    }).subscribe({
      next: (result) => {
        this.router.navigate(['/users/' + this.user.id]);
        this.snackBar.show("המשתמש עודכן בהצלחה");
        this.formLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        if (error.message.includes(ErrorId.Exists)) {
          this.snackBar.show("כתובת הדוא\"ל כבר תפוסה");
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
    this.usersService.deleteUser(this.user.id!).subscribe({
      next: () => {
        this.router.navigate(['/users']);
        this.snackBar.show("המשתמש נמחק בהצלחה");
        this.formLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        if (error.message.includes(ErrorId.NotExists)) {
          this.router.navigate(['/users']);
          this.snackBar.show("המשתמש נמחק בהצלחה");
        } else {
          this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        }
        this.formLoading = false;
      }
    });
  }

}
