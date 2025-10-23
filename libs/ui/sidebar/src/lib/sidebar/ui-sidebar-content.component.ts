import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-sidebar-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [attr.data-slot]="'sidebar-content'"
      [attr.data-sidebar]="'content'"
      [ngClass]="'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden ' + class"
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
export class UiSidebarContentComponent {
  @Input() class = '';
}


