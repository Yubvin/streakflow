import { ChangeDetectionStrategy, Component, inject, input, computed } from '@angular/core';
import { UiTabsComponent } from './ui-tabs.component';
@Component({
  selector: 'ui-tabs-trigger',
  standalone: true,
  template: '<button type="button" [attr.data-state]="isActive() ? \'active\' : \'inactive\'" [attr.data-slot]="\'tabs-trigger\'" [disabled]="disabled()" (click)="select()" class="ui-tabs-trigger"><ng-content></ng-content></button>',
  styleUrls: ['./ui-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'[class]': 'customClass()'},
})
export class UiTabsTriggerComponent {
  readonly value = input.required<string>();
  readonly disabled = input<boolean>(false);
  readonly customClass = input<string>('');
  private tabs = inject(UiTabsComponent, { optional: true });
  readonly isActive = computed(() => this.tabs?.value() === this.value());
  select(): void { if (!this.disabled() && this.tabs) this.tabs.selectTab(this.value()); }
}
