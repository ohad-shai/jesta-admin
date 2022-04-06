import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { SnackBarUtil } from '../../_shared/utilities/snack-bar.util';

import { AuthService } from 'src/app/core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorId } from 'src/app/data/utilities/error-id';
import { ValidationBundles } from '../../_shared/validators/validation-bundles';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    formLoading!: boolean;
    form!: FormGroup;

    constructor(
        private router: Router,
        private title: Title,
        private snackBar: SnackBarUtil,
        private authService: AuthService,
    ) { }

    ngOnInit() {
        this.title.setTitle('ג\'סטה | ניהול | התחברות');

        this.form = new FormGroup({
            email: new FormControl('', ValidationBundles.emailRequired()),
            password: new FormControl('', ValidationBundles.passwordRequired()),
            rememberMe: new FormControl(true)
        });
    }

    performLogin() {
        if (this.form.invalid || this.formLoading) return;

        this.formLoading = true;

        const email = this.form.controls['email'].value.toLowerCase();
        const password = this.form.controls['password'].value;
        const rememberMe = this.form.controls['rememberMe'].value;

        this.authService.login(email, password, rememberMe).subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
            error: (error: HttpErrorResponse) => {
                if (error.message.includes(ErrorId.Invalid)) {
                    this.snackBar.show("דוא\"ל או סיסמה לא נכונים");
                } else {
                    this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
                }
                this.formLoading = false;
            }
        });
    }

}
