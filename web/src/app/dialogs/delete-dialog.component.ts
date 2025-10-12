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
  template: `
    <ui-dialog-content class="sm:max-w-[425px]">
      <ui-dialog-header>
        <ui-dialog-title>Delete Habit</ui-dialog-title>
        <ui-dialog-description>
          Are you sure you want to delete "Morning Exercise"? This action cannot be undone and all your progress will be lost.
        </ui-dialog-description>
      </ui-dialog-header>
      
      <ui-dialog-footer>
        <ui-button variant="outline" (click)="close()">Cancel</ui-button>
        <ui-button variant="destructive" (click)="confirm()">Delete Habit</ui-button>
      </ui-dialog-footer>
    </ui-dialog-content>
  `,
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

