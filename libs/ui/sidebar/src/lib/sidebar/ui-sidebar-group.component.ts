import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-sidebar-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [attr.data-slot]="'sidebar-group'"
      [attr.data-sidebar]="'group'"
      [ngClass]="'relative flex w-full min-w-0 flex-col p-2 ' + class"
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
export class UiSidebarGroupComponent {
  @Input() class = '';
}


