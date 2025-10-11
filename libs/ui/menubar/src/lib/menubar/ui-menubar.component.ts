import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-menubar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-menubar.component.html',
  styleUrl: './ui-menubar.component.scss',
  host: {
    '[attr.data-slot]': '"menubar"',
    'class': 'ui-menubar',
  },
})
export class UiMenubarComponent {
  // Menubar root - контейнер для всех меню
}

