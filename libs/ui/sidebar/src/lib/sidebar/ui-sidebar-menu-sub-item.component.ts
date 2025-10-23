import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-sidebar-menu-sub-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <li
      [attr.data-slot]="'sidebar-menu-sub-item'"
      [attr.data-sidebar]="'menu-sub-item'"
      [ngClass]="'group/menu-sub-item relative ' + class"
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
export class UiSidebarMenuSubItemComponent {
  @Input() class = '';
}


