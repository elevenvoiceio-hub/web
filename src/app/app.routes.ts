import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';

export const routes: Routes = [
  ...authRoutes,
  {
    path: 'app',
    loadComponent: () =>
      import('./features/voice-app/voice-app').then((m) => m.VoiceApp),
  }
];
