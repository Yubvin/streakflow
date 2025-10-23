import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-sidebar-separator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [attr.data-slot]="'sidebar-separator'"
      [attr.data-sidebar]="'separator'"
      [ngClass]="'bg-sidebar-border mx-2 w-auto h-px ' + class"
    ></div>
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class UiSidebarSeparatorComponent {
  @Input() class = '';
}


