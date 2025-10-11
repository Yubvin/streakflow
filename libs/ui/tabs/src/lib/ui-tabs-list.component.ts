import { ChangeDetectionStrategy, Component, input } from '@angular/core';
@Component({
  selector: 'ui-tabs-list',
  standalone: true,
  template: '<div class="ui-tabs-list" [attr.data-slot]="\'tabs-list\'"><ng-content></ng-content></div>',
  styleUrls: ['./ui-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'[class]': 'customClass()'},
})
export class UiTabsListComponent {
  readonly customClass = input<string>('');
}
