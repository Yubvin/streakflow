import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-select-label',
  standalone: true,
  templateUrl: './ui-select-label.component.html',
  styleUrls: ['./ui-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSelectLabelComponent {}
