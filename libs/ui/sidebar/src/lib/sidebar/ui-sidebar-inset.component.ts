import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-sidebar-inset',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main
      [attr.data-slot]="'sidebar-inset'"
      [ngClass]="classes()"
    >
      <ng-content></ng-content>
    </main>
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class UiSidebarInsetComponent {
  @Input() class = '';

  protected classes(): string {
    return [
      'bg-background relative flex w-full flex-1 flex-col',
      'md:peer-data-[variant=inset]:m-2',
      'md:peer-data-[variant=inset]:ml-0',
      'md:peer-data-[variant=inset]:rounded-xl',
      'md:peer-data-[variant=inset]:shadow-sm',
      'md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
      this.class
    ].join(' ');
  }
}


