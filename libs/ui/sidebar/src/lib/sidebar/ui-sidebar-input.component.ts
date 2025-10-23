import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-ui-sidebar-input',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiSidebarInputComponent),
      multi: true
    }
  ],
  template: `
    <input
      [attr.data-slot]="'sidebar-input'"
      [attr.data-sidebar]="'input'"
      [ngClass]="'bg-background h-8 w-full shadow-none rounded-md border px-3 py-1 text-sm ' + class"
      [value]="value"
      [placeholder]="placeholder"
      [disabled]="disabled"
      (input)="onInput($event)"
      (blur)="onTouched()"
    />
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class UiSidebarInputComponent implements ControlValueAccessor {
  @Input() class = '';
  @Input() placeholder = '';
  
  value = '';
  disabled = false;
  
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

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
    this.disabled = isDisabled;
  }
}


