import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    formLoading!: boolean;
    form!: FormGroup;
    
    constructor(private router: Router,
        private titleService: Title,
        private notificationService: NotificationService,
        private authService: AuthService) {
    }

    ngOnInit() {
        this.titleService.setTitle('ג\'סטה | ממשק ניהול | התחברות');

        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
            rememberMe: new FormControl(true)
        });
    }

    performLogin() {
        const email = this.form.controls['email'].value;
        const password = this.form.controls['password'].value;
        const rememberMe = this.form.controls['rememberMe'].value;

        this.formLoading = true;
        // this.authService.login(email.toLowerCase(), password)
        //     .subscribe(
        //         data => {
        //             if (rememberMe) {
        //                 localStorage.setItem('savedUserEmail', email);
        //             } else {
        //                 localStorage.removeItem('savedUserEmail');
        //             }
        //             this.router.navigate(['/']);
        //         },
        //         error => {
        //             this.notificationService.openSnackBar(error.error);
        //             this.loading = false;
        //         }
        //     );
    }

}
