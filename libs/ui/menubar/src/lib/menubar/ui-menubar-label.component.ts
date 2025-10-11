import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-menubar-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-menubar-label.component.html',
  host: {
    '[attr.data-slot]': '"menubar-label"',
    '[attr.data-inset]': 'inset() ? "true" : null',
    'class': 'ui-menubar-label',
  },
})
export class UiMenubarLabelComponent {
  readonly inset = input<boolean>(false);
}

