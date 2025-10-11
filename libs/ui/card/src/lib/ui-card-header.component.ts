import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-card-header',
  standalone: true,
  templateUrl: './ui-card-header.component.html',
  styleUrls: ['./ui-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiCardHeaderComponent {
  readonly customClass = input<string>('');
}

