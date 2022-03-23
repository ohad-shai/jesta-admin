import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate() {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/']);
            return false;
        } else {
            return true;
        }
    }

}
