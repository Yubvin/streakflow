import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { UiDialogContentComponent, UiDialogHeaderComponent, UiDialogTitleComponent, UiDialogDescriptionComponent, UiDialogFooterComponent } from '@streakflow/ui/dialog';
import { UiButtonComponent } from '@streakflow/ui/button';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    UiDialogContentComponent,
    UiDialogHeaderComponent,
    UiDialogTitleComponent,
    UiDialogDescriptionComponent,
    UiDialogFooterComponent,
    UiButtonComponent,
  ],
  templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent {
  constructor(public dialogRef: DialogRef) {}

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    console.log('Habit deleted!');
    this.dialogRef.close(true);
  }
}

