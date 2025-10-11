import { ChangeDetectionStrategy, Component, input, output, HostListener } from '@angular/core';

@Component({
  selector: 'ui-dropdown-menu-item',
  standalone: true,
  template: `
    <div 
      class="ui-dropdown-menu-item" 
      data-slot="dropdown-menu-item"
      [class.ui-dropdown-menu-item--disabled]="disabled()"
      role="menuitem"
      [attr.tabindex]="disabled() ? -1 : 0"
      [attr.aria-disabled]="disabled()"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./ui-dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiDropdownMenuItemComponent {
  readonly disabled = input<boolean>(false);
  readonly customClass = input<string>('');

  readonly clicked = output<void>();

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!this.disabled()) {
        this.clicked.emit();
      }
    }
  }
}
