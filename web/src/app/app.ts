import { Component, input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiButtonComponent } from '@streakflow/ui/button';
import { UiBadgeComponent } from '@streakflow/ui/badge';
import { UiSeparatorComponent } from '@streakflow/ui/separator';
import { UiAvatarComponent } from '@streakflow/ui/avatar';
import { UiSkeletonComponent } from '@streakflow/ui/skeleton';
import { UiInputComponent } from '@streakflow/ui/input';
import { UiProgressComponent } from '@streakflow/ui/progress';
import { UiProgressStepsComponent } from '@streakflow/ui/progress-steps';
import { UiLabelComponent } from '@streakflow/ui/label';
import { UiCardComponent, UiCardHeaderComponent, UiCardTitleComponent, UiCardDescriptionComponent, UiCardActionComponent, UiCardContentComponent, UiCardFooterComponent } from '@streakflow/ui/card';
import { UiAspectRatioComponent } from '@streakflow/ui/aspect-ratio';
import { UiTextareaComponent } from '@streakflow/ui/textarea';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <span
      class="inline-flex items-center justify-center bg-zinc-200 text-zinc-700 rounded-sm"
      [style.width.rem]="size() / 4"
      [style.height.rem]="size() / 4"
    >
      <small>{{ name() }}</small>
    </span>
  `,
})
export class AppIcon {
  readonly name = input<string>('');
  readonly size = input<number>(16);
}

@Component({
  imports: [RouterModule, AppIcon, UiButtonComponent, UiBadgeComponent, UiSeparatorComponent, UiAvatarComponent, UiSkeletonComponent, UiInputComponent, UiProgressComponent, UiProgressStepsComponent, UiLabelComponent, UiCardComponent, UiCardHeaderComponent, UiCardTitleComponent, UiCardDescriptionComponent, UiCardActionComponent, UiCardContentComponent, UiCardFooterComponent, UiAspectRatioComponent, UiTextareaComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly loading = signal(false);

  toggleLoading() {
    this.loading.update((v) => !v);
  }
}
