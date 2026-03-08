import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';

export const routes: Routes = [
  ...authRoutes,
  {
    path: 'app',
    loadComponent: () => import('./features/voice-app/voice-app').then((m) => m.VoiceApp),
    loadChildren: () =>
      import('./features/voice-app/voice-app.routes').then((m) => m.voiceAppRoutes),
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin').then((m) => m.Admin),
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'app',
  },
];
