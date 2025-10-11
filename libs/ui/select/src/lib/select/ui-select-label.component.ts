import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-select-label',
  standalone: true,
  template: `
    <div 
      class="ui-select-label" 
      data-slot="select-label"
      role="group"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./ui-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSelectLabelComponent {}
