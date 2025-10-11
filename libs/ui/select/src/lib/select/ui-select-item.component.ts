import { ChangeDetectionStrategy, Component, input, output, HostListener } from '@angular/core';

@Component({
  selector: 'ui-select-item',
  standalone: true,
  templateUrl: './ui-select-item.component.html',
  styleUrls: ['./ui-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiSelectItemComponent {
  readonly value = input.required<string>();
  readonly selected = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly customClass = input<string>('');

  readonly selectedChange = output<string>();

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.selectedChange.emit(this.value());
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!this.disabled()) {
        this.selectedChange.emit(this.value());
      }
    }
  }
}
