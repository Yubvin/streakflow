import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-dialog-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-dialog-title.component.html',
  host: {
    '[attr.data-slot]': '"dialog-title"',
    'class': 'ui-dialog-title',
  },
})
export class UiDialogTitleComponent {}

