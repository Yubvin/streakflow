import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-radio-group',
  standalone: true,
  templateUrl: './ui-radio-group.component.html',
  styleUrls: ['./ui-radio-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-slot]': '"radio-group"',
    '[class]': 'customClass()',
    role: 'radiogroup',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiRadioGroupComponent),
      multi: true,
    },
  ],
})
export class UiRadioGroupComponent implements ControlValueAccessor {
  readonly customClass = input<string>('');

  value: string = '';
  
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handle disabled state if needed
  }

  selectValue(newValue: string): void {
    this.value = newValue;
    this.onChange(this.value);
    this.onTouched();
  }
}

