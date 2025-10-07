import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgIf } from '@angular/common';

export type UiButtonVariant = 'primary' | 'secondary' | 'ghost';
export type UiButtonSize = 'sm' | 'md' | 'lg';
export type UiButtonType = 'button' | 'submit' | 'reset';
@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [NgIf],
  templateUrl: './ui-button.html',
  styleUrl: './ui-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButton {
  variant = input<UiButtonVariant>('primary');
  size = input<UiButtonSize>('md');
  type = input<UiButtonType>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  block = input<boolean>(false); // full width

  private readonly base =
    'inline-flex items-center justify-center rounded-md font-medium transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2';

  private readonly sizeClasses: Record<UiButtonSize, string> = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
  };

  private readonly variantClasses: Record<UiButtonVariant, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400',
    secondary:
      'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus:ring-zinc-300',
    ghost: 'bg-transparent text-zinc-900 hover:bg-zinc-100 focus:ring-zinc-300',
  };

  private join(...tokens: Array<string | false | null | undefined>) {
    return tokens.filter(Boolean).join(' ');
  }

  classes = computed(() =>
    this.join(
      this.base,
      this.sizeClasses[this.size()],
      this.variantClasses[this.variant()],
      this.block() && 'w-full',
      (this.disabled() || this.loading()) && 'opacity-60 pointer-events-none'
    )
  );
}
