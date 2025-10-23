import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-sidebar-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [attr.data-slot]="'sidebar-footer'"
      [attr.data-sidebar]="'footer'"
      [ngClass]="'flex flex-col gap-2 p-2 ' + class"
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
export class UiSidebarFooterComponent {
  @Input() class = '';
}


