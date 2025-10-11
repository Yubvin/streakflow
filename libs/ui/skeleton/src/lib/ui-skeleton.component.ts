import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-skeleton',
  standalone: true,
  templateUrl: './ui-skeleton.component.html',
  styleUrls: ['./ui-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-slot]': '"skeleton"',
    '[class]': 'customClass()',
  },
})
export class UiSkeletonComponent {
  readonly customClass = input<string>('');
}

