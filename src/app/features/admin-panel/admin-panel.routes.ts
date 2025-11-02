import { Routes } from '@angular/router';
import { RoleGuard } from '../../core/guards/role-guard/role-guard';

export const ADMIN_DASHBOARD_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
    title: 'Admin Dashboard',
    canActivate: [RoleGuard],
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users').then((m) => m.Users),
    title: 'Users',
    canActivate: [RoleGuard],
  },
  {
    path: 'ai-management',
    loadComponent: () =>
      import('./pages/ai-management/ai-management').then((m) => m.AiManagement),
    title: 'AI Management',
    canActivate: [RoleGuard],
  },
  {
    path: 'plan-management',
    loadComponent: () =>
      import('./pages/plan-management/plan-management').then(
        (m) => m.PlanManagement
      ),
    title: 'Plan Management',
    canActivate: [RoleGuard],
  },
  {
    path: 'voice-management',
    loadComponent: () =>
      import('./pages/voice-management/voice-management').then(
        (m) => m.VoiceManagement
      ),
    title: 'Voice Management',
    canActivate: [RoleGuard],
  },
  {
    path: 'email-settings',
    loadComponent: () =>
      import('./pages/email-settings/email-settings').then(
        (m) => m.EmailSettings
      ),
    title: 'Email Settings',
    canActivate: [RoleGuard],
  },
  {
    path: 'payment-gateway-settings',
    loadComponent: () =>
      import('./pages/payment-gateway-settings/payment-gateway-settings').then(
        (m) => m.PaymentGatewaySettings
      ),
    title: 'Payment Gateway Settings',
    canActivate: [RoleGuard],
  },
  {
    path: 'service-requests',
    loadComponent: () =>
      import('./pages/service-requests/service-requests').then(
        (m) => m.ServiceRequests
      ),
    title: 'Service Requests',
    canActivate: [RoleGuard],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
