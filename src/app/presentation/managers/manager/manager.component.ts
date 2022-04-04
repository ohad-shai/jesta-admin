import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SnackBarUtil } from '../../_shared/utilities/snack-bar.util';
import { MultiComponent } from '../../_shared/objects/multi-component';
import { ComponentMode } from '../../_shared/objects/component-mode';
import { ValidationBundles } from '../../_shared/validators/validation-bundles';
import { equals } from '../../_shared/validators/equals.validator';
import { ManagerModel } from 'src/app/data/models/manager.model';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html'
})
export class ManagerComponent extends MultiComponent implements OnInit {

  initialLoading: boolean = false;
  manager: ManagerModel = new ManagerModel();
  form!: FormGroup;
  formLoading: boolean = false;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private snackBar: SnackBarUtil,
    private usersService: UsersService,
  ) { super(); }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      email: new FormControl('', ValidationBundles.email()), // TODO: check email in DB
      password: new FormControl('', ValidationBundles.password()),
      passwordConfirm: new FormControl('', ValidationBundles.password())
    }, { validators: [equals('passwordConfirm', 'password')] });

    this.route.data.subscribe(data => {
      this.mode = <ComponentMode>data["mode"];
      if (this.mode == undefined) throw new Error("The route does not include the \"mode\" data property.");

      if (!this.isCreateMode()) {
        this.route.params.subscribe(params => {
          // Gets the manager from the server:
          this.initialLoading = true;
          this.usersService.getUserById(params["id"]).subscribe({
            next: (data) => {
              this.manager = <ManagerModel>data;
              this.form.controls["firstName"].setValue(this.manager.firstName);
              this.form.controls["lastName"].setValue(this.manager.lastName);
              this.form.controls["email"].setValue(this.manager.email);
              this.titleService.setTitle('ג\'סטה | ניהול | ' + this.manager.getFullName());
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

    // const email = this.form.controls['email'].value.toLowerCase();
    // const password = this.form.controls['password'].value;
    // const rememberMe = this.form.controls['rememberMe'].value;

    // this.authService.login(email, password, rememberMe).subscribe({
    //   next: () => {
    //     this.router.navigate(['/']);
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     if (error.message == "user is not exist" || error.message == "password is wrong") {
    //       this.snackBar.show("דוא\"ל או סיסמה לא נכונים");
    //     } else {
    //       this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
    //     }
    //     this.formLoading = false;
    //   }
    // });
  }

  performUpdate() {
    if (this.form.invalid || this.formLoading) return;

    this.formLoading = true;

    // const email = this.form.controls['email'].value.toLowerCase();
    // const password = this.form.controls['password'].value;
    // const rememberMe = this.form.controls['rememberMe'].value;

    // this.authService.login(email, password, rememberMe).subscribe({
    //   next: () => {
    //     this.router.navigate(['/']);
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     if (error.message == "user is not exist" || error.message == "password is wrong") {
    //       this.snackBar.show("דוא\"ל או סיסמה לא נכונים");
    //     } else {
    //       this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
    //     }
    //     this.formLoading = false;
    //   }
    // });
  }

  performDelete() {
    if (this.formLoading) return;

    this.formLoading = true;

    // const email = this.form.controls['email'].value.toLowerCase();
    // const password = this.form.controls['password'].value;
    // const rememberMe = this.form.controls['rememberMe'].value;

    // this.authService.login(email, password, rememberMe).subscribe({
    //   next: () => {
    //     this.router.navigate(['/']);
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     if (error.message == "user is not exist" || error.message == "password is wrong") {
    //       this.snackBar.show("דוא\"ל או סיסמה לא נכונים");
    //     } else {
    //       this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
    //     }
    //     this.formLoading = false;
    //   }
    // });
  }

}
