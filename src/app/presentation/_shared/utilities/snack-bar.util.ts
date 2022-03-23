import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackBarUtil {

    public static Duration = class {
        public static readonly SHORT: number = 1500;
        public static readonly LONG: number = 3000;
        public static readonly INDEFINITE: number = 0;
    }

    constructor(private snackBar: MatSnackBar) { }

    public show(message: string, duration: number = SnackBarUtil.Duration.SHORT) {
        this.snackBar.open(message, '', { duration: duration });
    }

}