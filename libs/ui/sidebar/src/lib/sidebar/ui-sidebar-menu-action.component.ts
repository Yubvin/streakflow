import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-sidebar-menu-action',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [attr.data-slot]="'sidebar-menu-action'"
      [attr.data-sidebar]="'menu-action'"
      [ngClass]="classes()"
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
  `]
})
export class UiSidebarMenuActionComponent {
  @Input() showOnHover = false;
  @Input() class = '';
  @Output() clicked = new EventEmitter<MouseEvent>();

  protected classes(): string {
    const base = [
      'text-sidebar-foreground',
      'ring-sidebar-ring',
      'hover:bg-sidebar-accent',
      'hover:text-sidebar-accent-foreground',
      'peer-hover/menu-button:text-sidebar-accent-foreground',
      'absolute top-1.5 right-1',
      'flex aspect-square w-5 items-center justify-center',
      'rounded-md p-0 outline-hidden',
      'transition-transform',
      'focus-visible:ring-2',
      'after:absolute after:-inset-2 md:after:hidden',
      'peer-data-[size=sm]/menu-button:top-1',
      'peer-data-[size=default]/menu-button:top-1.5',
      'peer-data-[size=lg]/menu-button:top-2.5',
      'group-data-[collapsible=icon]:hidden'
    ];

    if (this.showOnHover) {
      base.push(
        'peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
        'group-focus-within/menu-item:opacity-100',
        'group-hover/menu-item:opacity-100',
        'data-[state=open]:opacity-100',
        'md:opacity-0'
      );
    }

    base.push(this.class);

    return base.join(' ');
  }
}


