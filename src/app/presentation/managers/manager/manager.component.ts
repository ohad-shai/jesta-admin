import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MultiComponent } from '../../_shared/objects/multi-component';
import { ManagerModel } from 'src/app/data/models/manager.model';
import { ComponentMode } from '../../_shared/objects/component-mode';
import { ValidationBundles } from '../../_shared/validators/validation-bundles';
import { equals } from '../../_shared/validators/equals.validator';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html'
})
export class ManagerComponent extends MultiComponent implements OnInit {

  loading: boolean = false;
  manager!: ManagerModel;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
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
    });

    this.route.params.subscribe(params => {
      // TODO: get from DB
      this.manager = new ManagerModel("123", "שם", "מלא");
    });
  }

  performCreate() {
    if (this.form.invalid || this.loading) return;

    this.loading = true;

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
    if (this.form.invalid || this.loading) return;

    this.loading = true;

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
    if (this.loading) return;

    this.loading = true;

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
