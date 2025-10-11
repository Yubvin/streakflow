import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-menubar-shortcut',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-menubar-shortcut.component.html',
  host: {
    '[attr.data-slot]': '"menubar-shortcut"',
    'class': 'ui-menubar-shortcut',
  },
})
export class UiMenubarShortcutComponent {}

