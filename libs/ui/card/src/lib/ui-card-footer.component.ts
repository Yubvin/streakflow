import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-card-footer',
  standalone: true,
  templateUrl: './ui-card-footer.component.html',
  styleUrls: ['./ui-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiCardFooterComponent {
  readonly customClass = input<string>('');
}

