import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-dialog-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-dialog-footer.component.html',
  host: {
    '[attr.data-slot]': '"dialog-footer"',
    'class': 'ui-dialog-footer',
  },
})
export class UiDialogFooterComponent {}

