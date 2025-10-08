import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type UiBadgeVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'destructive';

export type UiBadgeSize = 'sm' | 'md';

@Component({
  selector: 'ui-badge',
  standalone: true,
  templateUrl: './ui-badge.component.html',
  styleUrls: ['./ui-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[class.is-clickable]': 'interactive()',
    '[class]': 'customClass()',
    role: 'status',
  },
})
export class UiBadgeComponent {
  public readonly variant = input<UiBadgeVariant>('default');
  public readonly size = input<UiBadgeSize>('md');
  public readonly interactive = input<boolean>(false);
  public readonly ariaLabel = input<string | null>(null);
  public readonly customClass = input<string>('');

  public readonly computedAriaLabel = computed<string | null>(
    () => this.ariaLabel() ?? null
  );
}
