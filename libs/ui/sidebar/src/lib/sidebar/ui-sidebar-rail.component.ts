import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSidebarService } from './ui-sidebar.service';

@Component({
  selector: 'lib-ui-sidebar-rail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [attr.data-sidebar]="'rail'"
      [attr.data-slot]="'sidebar-rail'"
      [attr.aria-label]="'Toggle Sidebar'"
      [attr.title]="'Toggle Sidebar'"
      [attr.tabindex]="-1"
      [ngClass]="classes()"
      (click)="handleClick()"
    >
    </button>
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class UiSidebarRailComponent {
  @Input() class = '';

  constructor(private sidebarService: UiSidebarService) {}

  handleClick(): void {
    this.sidebarService.toggleSidebar();
  }

  protected classes(): string {
    return [
      'hover:after:bg-sidebar-border',
      'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2',
      'transition-all ease-linear',
      'group-data-[side=left]:-right-4',
      'group-data-[side=right]:left-0',
      'after:absolute after:inset-y-0 after:left-1/2 after:w-[2px]',
      'sm:flex',
      'in-data-[side=left]:cursor-w-resize',
      'in-data-[side=right]:cursor-e-resize',
      '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize',
      '[[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
      'hover:group-data-[collapsible=offcanvas]:bg-sidebar',
      'group-data-[collapsible=offcanvas]:translate-x-0',
      'group-data-[collapsible=offcanvas]:after:left-full',
      '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
      '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
      this.class
    ].join(' ');
  }
}


