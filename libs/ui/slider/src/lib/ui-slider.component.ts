import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, forwardRef, inject, input, output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-slider.component.html',
  styleUrls: ['./ui-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-slot]': '"slider"',
    '[class]': 'customClass()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiSliderComponent),
      multi: true,
    },
  ],
})
export class UiSliderComponent implements ControlValueAccessor {
  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly step = input<number>(1);
  readonly disabled = input<boolean>(false);
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly customClass = input<string>('');
  readonly valueChange = output<number>();

  value: number = 0;
  
  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};
  private cdr = inject(ChangeDetectorRef);

  get percentage(): number {
    const min = this.min();
    const max = this.max();
    const val = this.value;
    return ((val - min) / (max - min)) * 100;
  }

  writeValue(value: number): void {
    this.value = value ?? this.min();
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handle disabled state if needed
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = Number(target.value);
    this.onChange(this.value);
    this.valueChange.emit(this.value);
    this.cdr.markForCheck();
  }

  onBlur(): void {
    this.onTouched();
  }
}

