import { Component, Input, Output, EventEmitter, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSidebarService } from './ui-sidebar.service';

type MenuButtonVariant = 'default' | 'outline';
type MenuButtonSize = 'default' | 'sm' | 'lg';

@Component({
  selector: 'lib-ui-sidebar-menu-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [attr.data-slot]="'sidebar-menu-button'"
      [attr.data-sidebar]="'menu-button'"
      [attr.data-size]="size"
      [attr.data-active]="isActive"
      [ngClass]="buttonClasses()"
      (click)="clicked.emit($event)"
    >
      <ng-content></ng-content>
    </button>
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
export class UiSidebarMenuButtonComponent {
  @Input() isActive = false;
  @Input() variant: MenuButtonVariant = 'default';
  @Input() size: MenuButtonSize = 'default';
  @Input() tooltip = '';
  @Input() class = '';
  @Output() clicked = new EventEmitter<MouseEvent>();

  protected readonly buttonClasses = computed(() => {
    const base = [
      'peer/menu-button',
      'flex w-full items-center gap-2 overflow-hidden rounded-md p-2',
      'text-left text-sm outline-hidden',
      'ring-sidebar-ring',
      'transition-[width,height,padding]',
      'focus-visible:ring-2',
      'active:bg-sidebar-accent active:text-sidebar-accent-foreground',
      'disabled:pointer-events-none disabled:opacity-50',
      'aria-disabled:pointer-events-none aria-disabled:opacity-50',
      'group-has-data-[sidebar=menu-action]/menu-item:pr-8',
      'group-data-[collapsible=icon]:size-8!',
      'group-data-[collapsible=icon]:p-2!'
    ];

    // Variant
    if (this.variant === 'default') {
      base.push('hover:bg-sidebar-accent hover:text-sidebar-accent-foreground');
    } else if (this.variant === 'outline') {
      base.push(
        'bg-background',
        'shadow-[0_0_0_1px_hsl(var(--sidebar-border))]',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]'
      );
    }

    // Size
    if (this.size === 'default') {
      base.push('h-8 text-sm');
    } else if (this.size === 'sm') {
      base.push('h-7 text-xs');
    } else if (this.size === 'lg') {
      base.push('h-12 text-sm group-data-[collapsible=icon]:p-0!');
    }

    // Active state
    if (this.isActive) {
      base.push(
        'bg-sidebar-accent',
        'font-medium',
        'text-sidebar-accent-foreground'
      );
    }

    base.push(this.class);

    return base.join(' ');
  });

  constructor(protected sidebarService: UiSidebarService) {}
}


