import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Snackbar {
  constructor(private matSkackBar: MatSnackBar) {}

  openSnackBar(messsage: string) {
    this.matSkackBar.open(messsage, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar'],
    });
  }
}
