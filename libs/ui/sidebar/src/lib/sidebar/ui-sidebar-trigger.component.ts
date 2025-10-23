import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSidebarService } from './ui-sidebar.service';

@Component({
  selector: 'lib-ui-sidebar-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [attr.data-sidebar]="'trigger'"
      [attr.data-slot]="'sidebar-trigger'"
      [ngClass]="'size-7 rounded-md hover:bg-accent hover:text-accent-foreground ' + class"
      (click)="handleClick($event)"
    >
      <!-- Panel Left Icon -->
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        class="size-4"
      >
        <rect width="18" height="18" x="3" y="3" rx="2"/>
        <path d="M9 3v18"/>
      </svg>
      <span class="sr-only">Toggle Sidebar</span>
    </button>
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class UiSidebarTriggerComponent {
  @Input() class = '';
  @Output() clicked = new EventEmitter<MouseEvent>();

  constructor(private sidebarService: UiSidebarService) {}

  handleClick(event: MouseEvent): void {
    this.clicked.emit(event);
    this.sidebarService.toggleSidebar();
  }
}


