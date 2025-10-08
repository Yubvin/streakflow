import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  booleanAttribute,
} from '@angular/core';

export type UiButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'destructive'
  | 'link';

export type UiButtonSize = 'sm' | 'md' | 'lg' | 'icon';
export type UiButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'ui-button',
  standalone: true,
  templateUrl: './ui-button.component.html',
  styleUrl: './ui-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-component': 'ui-button',
  },
})
export class UiButtonComponent {
  readonly variant = input<UiButtonVariant>('primary');
  readonly size = input<UiButtonSize>('md');
  readonly type = input<UiButtonType>('button');

  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly block = input(false, { transform: booleanAttribute });

  private joinClassNames(
    ...tokens: Array<string | false | null | undefined>
  ): string {
    return tokens.filter(Boolean).join(' ');
  }

  readonly classes = computed<string>(() =>
    this.joinClassNames(
      'btn',
      `variant-${this.variant()}`,
      `size-${this.size()}`,
      (this.disabled() || this.loading()) && 'is-disabled',
      this.loading() && 'is-loading',
      this.block() && 'is-block'
    )
  );
}
