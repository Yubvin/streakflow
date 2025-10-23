import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSidebarService } from './ui-sidebar.service';

export const SIDEBAR_WIDTH = '16rem';
export const SIDEBAR_WIDTH_MOBILE = '18rem';
export const SIDEBAR_WIDTH_ICON = '3rem';

@Component({
  selector: 'lib-ui-sidebar-provider',
  standalone: true,
  imports: [CommonModule],
  providers: [UiSidebarService],
  template: `
    <div 
      [attr.data-slot]="'sidebar-wrapper'"
      [style.--sidebar-width]="SIDEBAR_WIDTH"
      [style.--sidebar-width-icon]="SIDEBAR_WIDTH_ICON"
      [ngClass]="wrapperClasses()"
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
export class UiSidebarProviderComponent implements OnInit {
  @Input() defaultOpen = true;
  @Input() open?: boolean;
  @Input() class = '';
  
  readonly SIDEBAR_WIDTH = SIDEBAR_WIDTH;
  readonly SIDEBAR_WIDTH_ICON = SIDEBAR_WIDTH_ICON;

  protected readonly wrapperClasses = computed(() => {
    return `group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full ${this.class}`;
  });

  constructor(private sidebarService: UiSidebarService) {}

  ngOnInit(): void {
    if (this.open !== undefined) {
      this.sidebarService.setOpen(this.open);
    } else {
      this.sidebarService.setOpen(this.defaultOpen);
    }
  }
}


