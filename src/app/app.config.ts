import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { TemplatePageTitleStrategy } from './core/template-title-strategy/template-title-strategy';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthGuard } from './core/guards/auth-guard/auth-guard';
import { appInterceptor } from './core/interceptors/app-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([appInterceptor])),
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
    AuthGuard,
  ],
};
