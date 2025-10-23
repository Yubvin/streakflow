import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiButtonComponent } from '@streakflow/ui/button';
import { UiCardComponent } from '@streakflow/ui/card';

/**
 * WelcomeScreen - landing page for non-authenticated users
 * This is a DUMB component - presentation only
 */
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink, UiButtonComponent, UiCardComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {}

