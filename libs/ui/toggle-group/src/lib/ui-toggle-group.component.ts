import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
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

  readonly value = signal<string | string[]>('');
  
  private onChange: (value: string | string[]) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | string[]): void {
    this.value.set(value || (this.type() === 'multiple' ? [] : ''));
  }

  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  selectValue(itemValue: string): void {
    const currentValue = this.value();
    if (this.type() === 'single') {
      const newValue = currentValue === itemValue ? '' : itemValue;
      this.value.set(newValue);
      this.onChange(newValue);
    } else {
      const values = Array.isArray(currentValue) ? currentValue : [];
      const index = values.indexOf(itemValue);
      const newValue = index > -1 
        ? values.filter(v => v !== itemValue)
        : [...values, itemValue];
      this.value.set(newValue);
      this.onChange(newValue);
    }
    this.onTouched();
  }
}

