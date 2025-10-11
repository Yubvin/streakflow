import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-select-group',
  standalone: true,
  template: `
    <div 
      class="ui-select-group" 
      data-slot="select-group"
      role="group"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./ui-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSelectGroupComponent {}
