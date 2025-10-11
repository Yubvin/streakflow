import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-menubar-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-menubar-menu.component.html',
  host: {
    '[attr.data-slot]': '"menubar-menu"',
    'class': 'ui-menubar-menu',
  },
})
export class UiMenubarMenuComponent {
  // State management
  isOpen = signal<boolean>(false);

  open() {
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }

  toggle() {
    this.isOpen.update(v => !v);
  }
}

