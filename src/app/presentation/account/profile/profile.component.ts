import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  updateNameFormLoading!: boolean;
  updateNameForm!: FormGroup;
  updateNameSettingValue!: string;
  updateEmailFormLoading!: boolean;
  updateEmailForm!: FormGroup;
  updateEmailSettingValue!: string;
  changePasswordFormLoading!: boolean;
  changePasswordForm!: FormGroup;
  deleteAccountFormLoading!: boolean;
  deleteAccountForm!: FormGroup;

  constructor(
    private titleService: Title,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('ג\'סטה | ניהול | הגדרות חשבון');

    this.updateNameSettingValue = "ישראל ישראלי";
    this.updateNameForm = new FormGroup({
      firstName: new FormControl('ישראל', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('ישראלי', [Validators.required, Validators.maxLength(50)])
    });

    this.updateEmailSettingValue = "israel@gmail.com";
    this.updateEmailForm = new FormGroup({
      email: new FormControl('israel@gmail.com', [Validators.required, Validators.email, Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)])
    });

    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      newPasswordConfirm: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)])
    });

    this.deleteAccountForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)])
    });
  }

  updateName() {
    if (this.updateNameForm.invalid || this.updateNameFormLoading) return; // TODO notification

    const firstName = this.updateNameForm.controls['firstName'].value;
    const lastName = this.updateNameForm.controls['lastName'].value;

    this.updateNameFormLoading = true;
    this.updateNameSettingValue = (firstName + ' ' + lastName);
  }

  updateEmail() {
    if (this.updateEmailForm.invalid || this.updateEmailFormLoading) return; // TODO notification

    const email = this.updateEmailForm.controls['email'].value;
    const password = this.updateEmailForm.controls['password'].value;

    this.updateEmailFormLoading = true;
    this.updateEmailSettingValue = email;
  }

  changePassword() {
    if (this.changePasswordForm.invalid || this.changePasswordFormLoading) return; // TODO notification

    const currentPassword = this.changePasswordForm.controls['currentPassword'].value;
    const newPassword = this.changePasswordForm.controls['newPassword'].value;
    const newPasswordConfirm = this.changePasswordForm.controls['newPasswordConfirm'].value;

    this.changePasswordFormLoading = true;
  }

  deleteAccount() {
    if (this.deleteAccountForm.invalid || this.deleteAccountFormLoading) return; // TODO notification

    const password = this.deleteAccountForm.controls['password'].value;

    this.deleteAccountFormLoading = true;
  }

}
