import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-dialog-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-dialog-description.component.html',
  host: {
    '[attr.data-slot]': '"dialog-description"',
    'class': 'ui-dialog-description',
  },
})
export class UiDialogDescriptionComponent {}

