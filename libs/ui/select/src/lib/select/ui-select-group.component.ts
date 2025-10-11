import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-select-group',
  standalone: true,
  templateUrl: './ui-select-group.component.html',
  styleUrls: ['./ui-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSelectGroupComponent {}
