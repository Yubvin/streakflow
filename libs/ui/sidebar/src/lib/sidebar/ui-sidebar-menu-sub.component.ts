import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-sidebar-menu-sub',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul
      [attr.data-slot]="'sidebar-menu-sub'"
      [attr.data-sidebar]="'menu-sub'"
      [ngClass]="classes()"
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
export class UiSidebarMenuSubComponent {
  @Input() class = '';

  protected classes(): string {
    return [
      'border-sidebar-border',
      'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1',
      'border-l px-2.5 py-0.5',
      'group-data-[collapsible=icon]:hidden',
      this.class
    ].join(' ');
  }
}


