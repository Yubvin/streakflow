import { Component, input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiButtonComponent } from '@streakflow/ui/button';
import { UiBadgeComponent } from '@streakflow/ui/badge';

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
  imports: [RouterModule, AppIcon, UiButtonComponent, UiBadgeComponent],
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
