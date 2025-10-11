import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-dropdown-menu-separator',
  standalone: true,
  template: `
    <div 
      class="ui-dropdown-menu-separator" 
      data-slot="dropdown-menu-separator"
      role="separator"
      aria-hidden="true"
    ></div>
  `,
  styleUrls: ['./ui-dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDropdownMenuSeparatorComponent {}
