import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private _snackBar: MatSnackBar) { }

  openToast(message: string, color: string = 'default', duration: number = 3000) {
    this._snackBar.open(message, 'cerrar', {
      duration,
      panelClass: [`snackbar-${color}`]
    });
  }
}
