import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-context-menu-label',
  standalone: true,
  template: `
    <div 
      class="ui-context-menu-label" 
      data-slot="context-menu-label"
      role="group"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./ui-context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiContextMenuLabelComponent {}
