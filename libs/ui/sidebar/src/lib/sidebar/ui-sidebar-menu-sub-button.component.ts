import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type MenuSubButtonSize = 'sm' | 'md';

@Component({
  selector: 'lib-ui-sidebar-menu-sub-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      [attr.data-slot]="'sidebar-menu-sub-button'"
      [attr.data-sidebar]="'menu-sub-button'"
      [attr.data-size]="size"
      [attr.data-active]="isActive"
      [ngClass]="classes()"
      [href]="href"
      (click)="clicked.emit($event)"
    >
      <ng-content></ng-content>
    </a>
  `,
  styles: [`
    :host {
      display: contents;
    }
    
    :host ::ng-deep svg {
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
    }
    
    :host ::ng-deep span:last-child {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  `]
})
export class UiSidebarMenuSubButtonComponent {
  @Input() isActive = false;
  @Input() size: MenuSubButtonSize = 'md';
  @Input() href = '#';
  @Input() class = '';
  @Output() clicked = new EventEmitter<MouseEvent>();

  protected classes(): string {
    const base = [
      'text-sidebar-foreground',
      'ring-sidebar-ring',
      'hover:bg-sidebar-accent',
      'hover:text-sidebar-accent-foreground',
      'active:bg-sidebar-accent',
      'active:text-sidebar-accent-foreground',
      'flex h-7 min-w-0 -translate-x-px items-center gap-2',
      'overflow-hidden rounded-md px-2',
      'outline-hidden',
      'focus-visible:ring-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'aria-disabled:pointer-events-none aria-disabled:opacity-50',
      'group-data-[collapsible=icon]:hidden'
    ];

    if (this.size === 'sm') {
      base.push('text-xs');
    } else if (this.size === 'md') {
      base.push('text-sm');
    }

    if (this.isActive) {
      base.push(
        'bg-sidebar-accent',
        'text-sidebar-accent-foreground'
      );
    }

    base.push(this.class);

    return base.join(' ');
  }
}


