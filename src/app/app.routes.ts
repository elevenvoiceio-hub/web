import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard/auth-guard';
import { RoleGuard } from './core/guards/role-guard/role-guard';

export const routes: Routes = [
  {
    path: 'app',
    loadComponent: () =>
      import('./features/voice-app/voice-app').then((m) => m.VoiceApp),
    loadChildren: () =>
      import('./features/voice-app/voice-app.routes').then(
        (m) => m.voiceAppRoutes
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'api-docs',
    loadComponent: () =>
      import('./features/api-docs/api-docs').then((m) => m.ApiDocs),
  },
  {
    path: 'pricing',
    loadComponent: () =>
      import('./features/pricing/pricing').then((m) => m.Pricing),
    title: 'Pricing',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
    title: 'Login',
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./features/forgot-password/forgot-password').then(
        (m) => m.ForgotPassword
      ),
    title: 'Forgot Password',
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./features/reset-password/reset-password').then(
        (m) => m.ResetPassword
      ),
    title: 'Reset Password',
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/sign-up/sign-up').then((m) => m.SignUp),
    title: 'Sign Up',
  },
  {
    path: 'verify-email',
    loadComponent: () =>
      import('./features/verify-email/verify-email').then((m) => m.VerifyEmail),
    title: 'Verify Email',
  },
  {
    path: 'user-profile',
    loadComponent: () =>
      import('./features/user-profile/user-profile').then((m) => m.UserProfile),
    title: 'User Profile',
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin-panel/admin-panel').then(
        (m) => m.AdminDashboard
      ),
    loadChildren: () =>
      import('./features/admin-panel/admin-panel.routes').then(
        (m) => m.ADMIN_DASHBOARD_ROUTES
      ),
    canActivate: [RoleGuard],
  },
  {
    path: 'billing',
    loadComponent: () =>
      import('./features/billing/billing').then((m) => m.Billing),
    title: 'Billing',
    canActivate: [AuthGuard],
  },
  {
    path: 'feedback',
    loadComponent: () =>
      import('./features/feedback/feedback').then((m) => m.Feedback),
    title: 'Feedback',
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'app/text-to-speech',
    pathMatch: 'full',
  },
];
