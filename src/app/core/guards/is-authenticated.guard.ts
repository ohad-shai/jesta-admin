import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
//import * as moment from 'moment';

import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
    providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {

    constructor(private router: Router,
        private authService: AuthService,
        private notificationService: NotificationService) { }

    canActivate() {
        // const user = this.authService.getCurrentUser();

        // if (user && user.expiration) {
        //     if (moment() < moment(user.expiration)) {
        //         return true;
        //     } else {
        //         this.notificationService.openSnackBar('Your session has expired');
        //         this.router.navigate(['auth/login']);
        //         return false;
        //     }
        // }

        this.router.navigate(['/login']);
        return false;
    }

}
