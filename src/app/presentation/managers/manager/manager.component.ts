import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MultiComponent } from '../../_shared/objects/multi-component';
import { ManagerModel } from 'src/app/data/models/manager.model';
import { ComponentMode } from '../../_shared/objects/component-mode';

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
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)])
    });

    this.route.data.subscribe(data => {
      this.mode = <ComponentMode>data["mode"];
    });

    this.route.params.subscribe(params => {
      // TODO: get from DB
      this.manager = { id: params["id"], name: "שם מלא" };
    });
  }

  submit() {
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

}
