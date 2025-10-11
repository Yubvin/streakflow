import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-card-description',
  standalone: true,
  templateUrl: './ui-card-description.component.html',
  styleUrls: ['./ui-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiCardDescriptionComponent {
  readonly customClass = input<string>('');
}

