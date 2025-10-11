import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-menubar-sub-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-menubar-sub-content.component.html',
  host: {
    '[attr.data-slot]': '"menubar-sub-content"',
    '[attr.data-state]': '"open"',
    'class': 'ui-menubar-sub-content',
    'role': 'menu',
  },
})
export class UiMenubarSubContentComponent {}

