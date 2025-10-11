import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type UiAvatarSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'ui-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-avatar.component.html',
  styleUrls: ['./ui-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-slot]': '"avatar"',
    '[attr.data-size]': 'size()',
  },
})
export class UiAvatarComponent {
  readonly size = input<UiAvatarSize>('md');
  readonly src = input<string>('');
  readonly alt = input<string>('');
  readonly fallback = input<string>('');
  
  readonly imageError = signal(false);
  
  onImageError() {
    this.imageError.set(true);
  }
}
