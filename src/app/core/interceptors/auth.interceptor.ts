import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';

import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Filters to only edit the graphql-related requests:
        if (req.url.indexOf('/graphql') > -1) {
            // Checks if there's an auth token:
            let token = this.authService.getCurrentUserValidJwtToken();
            if (token != null) {
                const clone = req.clone({
                    headers: req.headers.set('Authorization', token)
                });
                return next.handle(clone);
            }
        }
        return next.handle(req);
    }

}
