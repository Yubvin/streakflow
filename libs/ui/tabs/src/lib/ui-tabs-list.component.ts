import { ChangeDetectionStrategy, Component, input } from '@angular/core';
@Component({
  selector: 'ui-tabs-list',
  standalone: true,
  templateUrl: './ui-tabs-list.component.html',
  styleUrls: ['./ui-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'[class]': 'customClass()'},
})
export class UiTabsListComponent {
  readonly customClass = input<string>('');
}
