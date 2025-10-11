import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-dropdown-menu-label',
  standalone: true,
  template: `
    <div 
      class="ui-dropdown-menu-label" 
      data-slot="dropdown-menu-label"
      role="group"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./ui-dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDropdownMenuLabelComponent {}
