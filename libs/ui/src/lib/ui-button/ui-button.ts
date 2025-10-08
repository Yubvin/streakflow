import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  booleanAttribute,
} from '@angular/core';

export type UiButtonVariant = 'primary' | 'secondary' | 'ghost';
export type UiButtonSize = 'sm' | 'md' | 'lg';
export type UiButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'ui-button',
  standalone: true,
  templateUrl: './ui-button.html',
  styleUrl: './ui-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-component': 'ui-button',
  },
})
export class UiButton {
  readonly variant = input<UiButtonVariant>('primary');
  readonly size = input<UiButtonSize>('md');
  readonly type = input<UiButtonType>('button');

  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly block = input(false, { transform: booleanAttribute });

  private readonly base =
    'inline-flex items-center justify-center rounded-md font-medium transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 select-none';

  private readonly sizeClasses: Record<UiButtonSize, string> = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
  };

  private readonly variantClasses: Record<UiButtonVariant, string> = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400 disabled:bg-blue-600/70',
    secondary:
      'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus:ring-zinc-300 disabled:bg-zinc-100/70',
    ghost:
      'bg-transparent text-zinc-900 hover:bg-zinc-100 focus:ring-zinc-300 disabled:text-zinc-500',
  };

  private join(...tokens: Array<string | false | null | undefined>): string {
    return tokens.filter(Boolean).join(' ');
  }

  readonly classes = computed(() =>
    this.join(
      this.base,
      this.sizeClasses[this.size()],
      this.variantClasses[this.variant()],
      this.block() && 'w-full',
      this.loading() && 'cursor-progress'
    )
  );
}
