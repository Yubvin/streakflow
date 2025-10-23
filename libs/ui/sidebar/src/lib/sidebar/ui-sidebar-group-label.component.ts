import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-sidebar-group-label',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [attr.data-slot]="'sidebar-group-label'"
      [attr.data-sidebar]="'group-label'"
      [ngClass]="classes()"
    >
      <ng-content></ng-content>
    </div>
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
export class UiSidebarGroupLabelComponent {
  @Input() class = '';

  protected classes(): string {
    return [
      'text-sidebar-foreground/70',
      'ring-sidebar-ring',
      'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden',
      'transition-[margin,opacity] duration-200 ease-linear',
      'focus-visible:ring-2',
      'group-data-[collapsible=icon]:-mt-8',
      'group-data-[collapsible=icon]:opacity-0',
      this.class
    ].join(' ');
  }
}


