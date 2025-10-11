import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-menubar-sub',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-menubar-sub.component.html',
  host: {
    '[attr.data-slot]': '"menubar-sub"',
    'class': 'ui-menubar-sub',
  },
})
export class UiMenubarSubComponent {
  // State for submenu
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

