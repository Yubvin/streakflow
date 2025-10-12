import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'ui-dialog-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-dialog-content.component.html',
  styleUrl: './ui-dialog-content.component.scss',
  host: {
    '[attr.data-slot]': '"dialog-content"',
    'class': 'ui-dialog-content',
  },
})
export class UiDialogContentComponent {
  readonly hideClose = input<boolean>(false);
  
  constructor(public dialogRef: DialogRef) {}

  close(): void {
    this.dialogRef.close();
  }
}

