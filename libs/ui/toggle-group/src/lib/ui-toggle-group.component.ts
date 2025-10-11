import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type UiToggleGroupType = 'single' | 'multiple';
export type UiToggleGroupVariant = 'default' | 'outline';
export type UiToggleGroupSize = 'default' | 'sm' | 'lg';

@Component({
  selector: 'ui-toggle-group',
  standalone: true,
  templateUrl: './ui-toggle-group.component.html',
  styleUrls: ['./ui-toggle-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-slot]': '"toggle-group"',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[class]': 'customClass()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiToggleGroupComponent),
      multi: true,
    },
  ],
})
export class UiToggleGroupComponent implements ControlValueAccessor {
  readonly type = input<UiToggleGroupType>('single');
  readonly variant = input<UiToggleGroupVariant>('default');
  readonly size = input<UiToggleGroupSize>('default');
  readonly customClass = input<string>('');

  value: string | string[] = '';
  
  private onChange: (value: string | string[]) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | string[]): void {
    this.value = value || (this.type() === 'multiple' ? [] : '');
  }

  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  selectValue(itemValue: string): void {
    if (this.type() === 'single') {
      this.value = this.value === itemValue ? '' : itemValue;
    } else {
      const values = Array.isArray(this.value) ? this.value : [];
      const index = values.indexOf(itemValue);
      if (index > -1) {
        this.value = values.filter(v => v !== itemValue);
      } else {
        this.value = [...values, itemValue];
      }
    }
    this.onChange(this.value);
    this.onTouched();
  }
}

