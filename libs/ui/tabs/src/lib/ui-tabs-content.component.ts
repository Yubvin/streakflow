import { ChangeDetectionStrategy, Component, inject, input, computed } from '@angular/core';
import { UiTabsComponent } from './ui-tabs.component';
@Component({
  selector: 'ui-tabs-content',
  standalone: true,
  template: '@if (isActive()) { <div class="ui-tabs-content" [attr.data-slot]="\'tabs-content\'" [attr.data-state]="\'active\'"><ng-content></ng-content></div> }',
  styleUrls: ['./ui-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'[class]': 'customClass()'},
})
export class UiTabsContentComponent {
  readonly value = input.required<string>();
  readonly customClass = input<string>('');
  private tabs = inject(UiTabsComponent, { optional: true });
  readonly isActive = computed(() => this.tabs?.value() === this.value());
}
