import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-sidebar-menu-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [attr.data-slot]="'sidebar-menu-badge'"
      [attr.data-sidebar]="'menu-badge'"
      [ngClass]="classes()"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class UiSidebarMenuBadgeComponent {
  @Input() class = '';

  protected classes(): string {
    return [
      'text-sidebar-foreground',
      'pointer-events-none',
      'absolute right-1',
      'flex h-5 min-w-5 items-center justify-center',
      'rounded-md px-1',
      'text-xs font-medium tabular-nums select-none',
      'peer-hover/menu-button:text-sidebar-accent-foreground',
      'peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
      'peer-data-[size=sm]/menu-button:top-1',
      'peer-data-[size=default]/menu-button:top-1.5',
      'peer-data-[size=lg]/menu-button:top-2.5',
      'group-data-[collapsible=icon]:hidden',
      this.class
    ].join(' ');
  }
}


