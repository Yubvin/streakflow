import { ChangeDetectionStrategy, Component, inject, input, computed } from '@angular/core';
import { UiToggleGroupComponent } from './ui-toggle-group.component';

@Component({
  selector: 'ui-toggle-group-item',
  standalone: true,
  templateUrl: './ui-toggle-group-item.component.html',
  styleUrls: ['./ui-toggle-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-slot]': '"toggle-group-item"',
    '[class]': 'customClass()',
  },
})
export class UiToggleGroupItemComponent {
  readonly value = input.required<string>();
  readonly disabled = input<boolean>(false);
  readonly customClass = input<string>('');

  private toggleGroup = inject(UiToggleGroupComponent, { optional: true });

  readonly isPressed = computed(() => {
    if (!this.toggleGroup) return false;
    const groupValue = this.toggleGroup.value();
    return Array.isArray(groupValue)
      ? groupValue.includes(this.value())
      : groupValue === this.value();
  });

  toggle(): void {
    if (this.disabled() || !this.toggleGroup) return;
    this.toggleGroup.selectValue(this.value());
  }

  readonly variant = computed(() => this.toggleGroup?.variant() || 'default');
  readonly size = computed(() => this.toggleGroup?.size() || 'default');
}

