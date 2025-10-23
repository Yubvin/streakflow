import { Component, Input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSidebarService } from './ui-sidebar.service';

type SidebarSide = 'left' | 'right';
type SidebarVariant = 'sidebar' | 'floating' | 'inset';
type SidebarCollapsible = 'offcanvas' | 'icon' | 'none';

@Component({
  selector: 'lib-ui-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (collapsible === 'none') {
      <div 
        [attr.data-slot]="'sidebar'"
        [ngClass]="sidebarClasses()"
      >
        <ng-content></ng-content>
      </div>
    } @else if (isMobile()) {
      <!-- Mobile Sheet implementation would go here -->
      <!-- For now, simplified version -->
      <div 
        [attr.data-sidebar]="'sidebar'"
        [attr.data-slot]="'sidebar'"
        [attr.data-mobile]="'true'"
        [ngClass]="mobileSidebarClasses()"
        [style.--sidebar-width]="SIDEBAR_WIDTH_MOBILE"
        [hidden]="!openMobile()"
      >
        <div class="flex h-full w-full flex-col">
          <ng-content></ng-content>
        </div>
      </div>
    } @else {
      <div
        class="group peer text-sidebar-foreground hidden md:block"
        [attr.data-state]="state()"
        [attr.data-collapsible]="state() === 'collapsed' ? collapsible : ''"
        [attr.data-variant]="variant"
        [attr.data-side]="side"
        [attr.data-slot]="'sidebar'"
      >
        <!-- Sidebar gap -->
        <div
          [attr.data-slot]="'sidebar-gap'"
          [ngClass]="gapClasses()"
        ></div>
        
        <!-- Sidebar container -->
        <div
          [attr.data-slot]="'sidebar-container'"
          [ngClass]="containerClasses()"
        >
          <div
            [attr.data-sidebar]="'sidebar'"
            [attr.data-slot]="'sidebar-inner'"
            class="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
          >
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class UiSidebarComponent {
  @Input() side: SidebarSide = 'left';
  @Input() variant: SidebarVariant = 'sidebar';
  @Input() collapsible: SidebarCollapsible = 'offcanvas';
  @Input() class = '';

  readonly SIDEBAR_WIDTH_MOBILE = '18rem';

  protected readonly sidebarService = inject(UiSidebarService);
  readonly state = this.sidebarService.state;
  readonly isMobile = this.sidebarService.isMobile;
  readonly openMobile = this.sidebarService.openMobile;

  protected readonly sidebarClasses = computed(() => {
    return `bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col ${this.class}`;
  });

  protected readonly mobileSidebarClasses = computed(() => {
    return `bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 ${this.class}`;
  });

  protected readonly gapClasses = computed(() => {
    const base = [
      'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
      'group-data-[collapsible=offcanvas]:w-0',
      'group-data-[side=right]:rotate-180'
    ];

    if (this.variant === 'floating' || this.variant === 'inset') {
      base.push('group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]');
    } else {
      base.push('group-data-[collapsible=icon]:w-(--sidebar-width-icon)');
    }

    return base.join(' ');
  });

  protected readonly containerClasses = computed(() => {
    const base = [
      'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex',
    ];

    if (this.side === 'left') {
      base.push('left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]');
    } else {
      base.push('right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]');
    }

    if (this.variant === 'floating' || this.variant === 'inset') {
      base.push('p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]');
    } else {
      base.push(
        'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
        'group-data-[side=left]:border-r',
        'group-data-[side=right]:border-l'
      );
    }

    base.push(this.class);

    return base.join(' ');
  });
}

