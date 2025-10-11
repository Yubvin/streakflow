import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-context-menu-separator',
  standalone: true,
  template: `
    <div 
      class="ui-context-menu-separator" 
      data-slot="context-menu-separator"
      role="separator"
      aria-hidden="true"
    ></div>
  `,
  styleUrls: ['./ui-context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiContextMenuSeparatorComponent {}
