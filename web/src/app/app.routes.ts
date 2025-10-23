import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

/**
 * Application routes configuration
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  // Auth routes - for guests only
  {
    path: 'auth',
    canActivate: [guestGuard],
    children: [
      {
        path: 'welcome',
        loadComponent: () =>
          import('./features/auth/welcome/welcome.component').then(module => module.WelcomeComponent)
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(module => module.LoginComponent)
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./features/auth/signup/signup.component').then(module => module.SignUpComponent)
      },
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
      }
    ]
  },
  // App routes - protected by auth guard
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(module => module.DashboardComponent)
  },
  {
    path: 'habits',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/habits/habits.component').then(module => module.HabitsComponent)
  },
  {
    path: 'analytics',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/analytics/analytics.component').then(module => module.AnalyticsComponent)
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/profile/profile.component').then(module => module.ProfileComponent)
  },
  {
    path: '**',
    redirectTo: '/auth/welcome'
  }
];
