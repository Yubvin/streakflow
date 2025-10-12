import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-dialog-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-dialog-header.component.html',
  host: {
    '[attr.data-slot]': '"dialog-header"',
    'class': 'ui-dialog-header',
  },
})
export class UiDialogHeaderComponent {}

