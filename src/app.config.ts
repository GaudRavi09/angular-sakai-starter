import { appRoutes } from './app.routes';
import CustomPreset from './custom-preset';
import { providePrimeNG } from 'primeng/config';
import { ApplicationConfig } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { withFetch, provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling, withComponentInputBinding, withEnabledBlockingInitialNavigation } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    ConfirmationService,
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })
    ),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    providePrimeNG({ theme: { preset: CustomPreset, options: { darkModeSelector: '.app-dark' } } })
  ]
};
