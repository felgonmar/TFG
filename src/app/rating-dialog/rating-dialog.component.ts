import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  rating: number;
  comment: string;
  name: string;
}
@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html'
})
export class RatingDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RatingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
