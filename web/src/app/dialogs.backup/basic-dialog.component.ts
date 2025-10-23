import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { UiDialogContentComponent, UiDialogHeaderComponent, UiDialogTitleComponent, UiDialogDescriptionComponent, UiDialogFooterComponent } from '@streakflow/ui/dialog';
import { UiButtonComponent } from '@streakflow/ui/button';

@Component({
  selector: 'app-basic-dialog',
  standalone: true,
  imports: [
    UiDialogContentComponent,
    UiDialogHeaderComponent,
    UiDialogTitleComponent,
    UiDialogDescriptionComponent,
    UiDialogFooterComponent,
    UiButtonComponent,
  ],
  templateUrl: './basic-dialog.component.html',
})
export class BasicDialogComponent {
  constructor(public dialogRef: DialogRef) {}

  close(): void {
    this.dialogRef.close();
  }
}

