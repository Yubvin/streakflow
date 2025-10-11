import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-menubar-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-menubar-content.component.html',
  host: {
    '[attr.data-slot]': '"menubar-content"',
    '[attr.data-state]': '"open"',
    'class': 'ui-menubar-content',
    'role': 'menu',
  },
})
export class UiMenubarContentComponent {}

