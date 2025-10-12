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
  template: `
    <ui-dialog-content>
      <ui-dialog-header>
        <ui-dialog-title>Welcome to StreakFlow</ui-dialog-title>
        <ui-dialog-description>
          This is a basic dialog example. You can use dialogs for notifications, confirmations, or any content that needs user attention.
        </ui-dialog-description>
      </ui-dialog-header>
      
      <ui-dialog-footer>
        <ui-button variant="outline" (click)="close()">Close</ui-button>
        <ui-button (click)="close()">Got it</ui-button>
      </ui-dialog-footer>
    </ui-dialog-content>
  `,
})
export class BasicDialogComponent {
  constructor(public dialogRef: DialogRef) {}

  close(): void {
    this.dialogRef.close();
  }
}

