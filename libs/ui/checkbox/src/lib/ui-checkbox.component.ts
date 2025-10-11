import { ChangeDetectionStrategy, Component, forwardRef, input, output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  templateUrl: './ui-checkbox.component.html',
  styleUrls: ['./ui-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-slot]': '"checkbox"',
    '[class]': 'customClass()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiCheckboxComponent),
      multi: true,
    },
  ],
})
export class UiCheckboxComponent implements ControlValueAccessor {
  readonly disabled = input<boolean>(false);
  readonly customClass = input<string>('');
  readonly checkedChange = output<boolean>();

  checked: boolean = false;
  
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: boolean): void {
    this.checked = value || false;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handle disabled state if needed
  }

  toggle(): void {
    if (this.disabled()) return;
    
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.onTouched();
    this.checkedChange.emit(this.checked);
  }
}

