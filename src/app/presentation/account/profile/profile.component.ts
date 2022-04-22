import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { SnackBarUtil } from '../../_shared/utilities/snack-bar.util';
import { ValidationBundles } from '../../_shared/validators/validation-bundles';
import { equals } from '../../_shared/validators/equals.validator';
import { notEquals } from '../../_shared/validators/not-equals.validator';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserIdentity } from 'src/app/core/objects/user-identity';
import { UsersService } from 'src/app/core/services/users.service';
import { UserModel } from 'src/app/data/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ErrorId } from 'src/app/data/utilities/error-id';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  currentUser!: UserIdentity | null;
  @ViewChild('updateNamePanel', { static: true }) updateNamePanel!: MatExpansionPanel;
  updateNameFormLoading!: boolean;
  updateNameForm!: FormGroup;
  updateNameSettingValue!: string;
  @ViewChild('updateEmailPanel', { static: true }) updateEmailPanel!: MatExpansionPanel;
  updateEmailFormLoading!: boolean;
  updateEmailForm!: FormGroup;
  updateEmailSettingValue!: string;
  @ViewChild('changePasswordPanel', { static: true }) changePasswordPanel!: MatExpansionPanel;
  changePasswordFormLoading!: boolean;
  changePasswordForm!: FormGroup;
  @ViewChild('deleteAccountPanel', { static: true }) deleteAccountPanel!: MatExpansionPanel;
  deleteAccountFormLoading!: boolean;
  deleteAccountForm!: FormGroup;

  constructor(
    private title: Title,
    private snackBar: SnackBarUtil,
    private authService: AuthService,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('ג\'סטה | ניהול | הגדרות חשבון');

    // Gets the user info from the server:
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser == null) {
      this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
    }

    this.updateNameSettingValue = (this.currentUser!.firstName + ' ' + this.currentUser!.lastName);
    this.updateNameForm = new FormGroup({
      firstName: new FormControl(this.currentUser!.firstName, [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl(this.currentUser!.lastName, [Validators.required, Validators.maxLength(50)])
    });

    this.updateEmailSettingValue = this.currentUser!.email;
    this.updateEmailForm = new FormGroup({
      email: new FormControl(this.currentUser!.email, ValidationBundles.emailRequired()),
      password: new FormControl('', ValidationBundles.passwordRequired())
    });

    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', ValidationBundles.passwordRequired()),
      newPassword: new FormControl('', ValidationBundles.passwordRequired()),
      newPasswordConfirm: new FormControl('', ValidationBundles.passwordRequired())
    }, { validators: [equals('newPasswordConfirm', 'newPassword'), notEquals('newPassword', 'currentPassword')] });

    this.deleteAccountForm = new FormGroup({
      password: new FormControl('', ValidationBundles.passwordRequired())
    });
  }

  updateName() {
    if (this.updateNameForm.invalid || this.updateNameFormLoading) return;

    this.updateNameFormLoading = true;
    let toUpdate = <UserModel>{
      id: this.currentUser!.id,
      firstName: this.updateNameForm.controls['firstName'].value,
      lastName: this.updateNameForm.controls['lastName'].value,
    };
    this.usersService.updateUser(toUpdate).subscribe({
      next: () => {
        this.updateNameSettingValue = (toUpdate.firstName + ' ' + toUpdate.lastName);
        this.currentUser!.firstName = toUpdate.firstName!;
        this.currentUser!.lastName = toUpdate.lastName!;
        this.authService.updateCurrentUser(this.currentUser!);
        this.updateNameFormLoading = false;
        this.updateNamePanel.expanded = false;
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        this.updateNameFormLoading = false;
      }
    });
  }

  updateEmail() {
    if (this.updateEmailForm.invalid || this.updateEmailFormLoading) return;

    this.updateEmailFormLoading = true;

    const email = this.updateEmailForm.controls['email'].value.toLowerCase();
    const password = this.updateEmailForm.controls['password'].value;

    // TODO: remove...
    // console.log(this.currentUser!.id);
    // console.log(this.currentUser!.email);
    // console.log(password);
    // console.log(email);


    this.usersService.updateUserEmailSecure(this.currentUser!.id, this.currentUser!.email, password, email).subscribe({
      next: () => {
        this.updateEmailSettingValue = email;
        this.currentUser!.email = email;
        this.authService.updateCurrentUser(this.currentUser!);
        this.updateEmailFormLoading = false;
        this.updateEmailPanel.expanded = false;
      },
      error: (error: HttpErrorResponse) => {
        if (error.message.includes(ErrorId.Unauthorized) || error.message.includes(ErrorId.Invalid)) {
          this.snackBar.show("סיסמה לא נכונה");
        } else if (error.message.includes(ErrorId.Exists)) {
          this.snackBar.show("כתובת הדוא\"ל כבר תפוסה");
        } else {
          this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        }
        this.updateEmailFormLoading = false;
      }
    });
  }

  changePassword() {
    if (this.changePasswordForm.invalid || this.changePasswordFormLoading) return;

    this.changePasswordFormLoading = true;

    const currentPassword = this.changePasswordForm.controls['currentPassword'].value;
    const newPassword = this.changePasswordForm.controls['newPassword'].value;

    this.usersService.updateUserPasswordSecure(this.currentUser!.id, currentPassword, newPassword).subscribe({
      next: () => {
        this.changePasswordFormLoading = false;
        this.changePasswordPanel.expanded = false;
      },
      error: (error: HttpErrorResponse) => {
        if (error.message.includes(ErrorId.Unauthorized) || error.message.includes(ErrorId.Invalid)) {
          this.snackBar.show("סיסמה נוכחית לא נכונה");
        } else {
          this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        }
        this.changePasswordFormLoading = false;
      }
    });
  }

  deleteAccount() {
    if (this.deleteAccountForm.invalid || this.deleteAccountFormLoading) return;

    this.deleteAccountFormLoading = true;

    const password = this.deleteAccountForm.controls['password'].value;

    this.usersService.deleteUserAccountSecure(this.currentUser!.id, password).subscribe({
      next: () => {
        this.deleteAccountFormLoading = false;
        this.deleteAccountPanel.expanded = false;
        this.authService.logout();
        this.snackBar.show("חשבונך נמחק בהצלחה");
      },
      error: (error: HttpErrorResponse) => {
        if (error.message.includes(ErrorId.Unauthorized) || error.message.includes(ErrorId.Invalid)) {
          this.snackBar.show("סיסמה לא נכונה");
        } else {
          this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        }
        this.deleteAccountFormLoading = false;
      }
    });
  }

}
