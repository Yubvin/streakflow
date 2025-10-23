import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-sidebar-menu-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [attr.data-slot]="'sidebar-menu-skeleton'"
      [attr.data-sidebar]="'menu-skeleton'"
      [ngClass]="'flex h-8 items-center gap-2 rounded-md px-2 ' + class"
    >
      @if (showIcon) {
        <div
          class="size-4 rounded-md bg-muted animate-pulse"
          [attr.data-sidebar]="'menu-skeleton-icon'"
        ></div>
      }
      <div
        class="h-4 flex-1 rounded-md bg-muted animate-pulse"
        [attr.data-sidebar]="'menu-skeleton-text'"
        [style.max-width.%]="width"
      ></div>
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class UiSidebarMenuSkeletonComponent {
  @Input() showIcon = false;
  @Input() class = '';
  
  // Random width between 50 to 90%
  protected readonly width = Math.floor(Math.random() * 40) + 50;
}


