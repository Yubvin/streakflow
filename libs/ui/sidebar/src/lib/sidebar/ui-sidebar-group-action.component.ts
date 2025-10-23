import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-sidebar-group-action',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [attr.data-slot]="'sidebar-group-action'"
      [attr.data-sidebar]="'group-action'"
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
export class UiSidebarGroupActionComponent {
  @Input() class = '';
  @Output() clicked = new EventEmitter<MouseEvent>();

  protected classes(): string {
    return [
      'text-sidebar-foreground',
      'ring-sidebar-ring',
      'hover:bg-sidebar-accent',
      'hover:text-sidebar-accent-foreground',
      'absolute top-3.5 right-3',
      'flex aspect-square w-5 items-center justify-center',
      'rounded-md p-0 outline-hidden',
      'transition-transform',
      'focus-visible:ring-2',
      'after:absolute after:-inset-2 md:after:hidden',
      'group-data-[collapsible=icon]:hidden',
      this.class
    ].join(' ');
  }
}


