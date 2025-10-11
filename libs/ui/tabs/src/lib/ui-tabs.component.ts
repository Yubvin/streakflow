import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-tabs',
  standalone: true,
  template: '<div class="ui-tabs" [attr.data-slot]="\'tabs\'"><ng-content></ng-content></div>',
  styleUrls: ['./ui-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'[class]': 'customClass()'},
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => UiTabsComponent), multi: true}],
})
export class UiTabsComponent implements ControlValueAccessor {
  readonly customClass = input<string>('');
  value: string = '';
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  writeValue(value: string): void { this.value = value || ''; }
  registerOnChange(fn: (value: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  selectTab(tabValue: string): void { this.value = tabValue; this.onChange(this.value); this.onTouched(); }
}
