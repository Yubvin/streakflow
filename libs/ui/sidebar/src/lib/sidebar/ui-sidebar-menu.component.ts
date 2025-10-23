import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-sidebar-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul
      [attr.data-slot]="'sidebar-menu'"
      [attr.data-sidebar]="'menu'"
      [ngClass]="'flex w-full min-w-0 flex-col gap-1 ' + class"
    >
      <ng-content></ng-content>
    </ul>
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class UiSidebarMenuComponent {
  @Input() class = '';
}


