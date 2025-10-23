import { Component, input } from '@angular/core';
import { KPIData } from '../../../core/models/analytics.model';
import { UiCardComponent } from '@streakflow/ui/card';

/**
 * KPICard - displays key performance indicator
 * This is a DUMB component - presentation only
 */
@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [UiCardComponent],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss'
})
export class KpiCardComponent {
  // Inputs
  readonly data = input.required<KPIData>();
}

