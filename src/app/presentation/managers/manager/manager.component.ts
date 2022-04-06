import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarUtil } from '../../_shared/utilities/snack-bar.util';
import { MultiComponent } from '../../_shared/objects/multi-component';
import { ComponentMode } from '../../_shared/objects/component-mode';
import { ValidationBundles } from '../../_shared/validators/validation-bundles';
import { equals } from '../../_shared/validators/equals.validator';
import { ManagerModel } from 'src/app/data/models/manager.model';
import { ManagersService } from 'src/app/core/services/managers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorId } from 'src/app/data/utilities/error-id';

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
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: SnackBarUtil,
    private managersService: ManagersService,
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
          // Gets the manager from the server:
          this.initialLoading = true;
          this.managersService.getManagerById(params["id"]).subscribe({
            next: (data) => {
              this.manager = data;
              this.form.controls["firstName"].setValue(this.manager.firstName);
              this.form.controls["lastName"].setValue(this.manager.lastName);
              this.form.controls["email"].setValue(this.manager.email);
              this.title.setTitle('ג\'סטה | ניהול | ' + this.manager.getFullName());
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
    this.managersService.createManager(<ManagerModel>{
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      email: this.form.controls['email'].value.toLowerCase(),
      password: this.form.controls['password'].value,
    }).subscribe({
      next: () => {
        this.router.navigate(['/managers']);
        this.snackBar.show("המנהל נוסף בהצלחה");
        this.formLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        if (error.message == ErrorId.Exists) {
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
    this.managersService.updateManager(<ManagerModel>{
      id: this.manager.id,
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      email: this.form.controls['email'].value.toLowerCase(),
      password: (this.form.controls['password'].value ? this.form.controls['password'].value : undefined),
    }).subscribe({
      next: (result) => {
        this.router.navigate(['/managers/' + this.manager.id]);
        this.snackBar.show("המנהל עודכן בהצלחה");
        this.formLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        if (error.message == ErrorId.Exists) {
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
    this.managersService.deleteManager(this.manager.id!).subscribe({
      next: () => {
        this.router.navigate(['/managers']);
        this.snackBar.show("המנהל נמחק בהצלחה");
        this.formLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        if (error.message == ErrorId.NotExists) {
          this.router.navigate(['/managers']);
          this.snackBar.show("המנהל נמחק בהצלחה");
        } else {
          this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        }
        this.formLoading = false;
      }
    });
  }

}
