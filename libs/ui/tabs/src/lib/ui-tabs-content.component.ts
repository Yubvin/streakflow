import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { UiTabsComponent } from './ui-tabs.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'ui-tabs-content',
  standalone: true,
  imports: [CommonModule],
  template: '<div class="ui-tabs-content" [attr.data-slot]="\'tabs-content\'" [attr.data-state]="isActive ? \'active\' : \'inactive\'" *ngIf="isActive"><ng-content></ng-content></div>',
  styleUrls: ['./ui-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'[class]': 'customClass()'},
})
export class UiTabsContentComponent {
  readonly value = input.required<string>();
  readonly customClass = input<string>('');
  private tabs = inject(UiTabsComponent, { optional: true });
  get isActive(): boolean { return this.tabs?.value === this.value(); }
}
