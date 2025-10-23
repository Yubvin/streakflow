import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-sidebar-group-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [attr.data-slot]="'sidebar-group-content'"
      [attr.data-sidebar]="'group-content'"
      [ngClass]="'w-full text-sm ' + class"
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
export class UiSidebarGroupContentComponent {
  @Input() class = '';
}


