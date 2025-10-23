import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-sidebar-menu-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <li
      [attr.data-slot]="'sidebar-menu-item'"
      [attr.data-sidebar]="'menu-item'"
      [ngClass]="'group/menu-item relative ' + class"
    >
      <ng-content></ng-content>
    </li>
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class UiSidebarMenuItemComponent {
  @Input() class = '';
}


