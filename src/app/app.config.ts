import { ApplicationConfig, provideZoneChangeDetection,LOCALE_ID } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorResponseInterceptor } from './shared/interceptors/error-response.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { authInterceptor } from './shared/interceptors/auth.interceptor';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// Registra el idioma español
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()), 
    provideHttpClient(
      withInterceptors([errorResponseInterceptor,authInterceptor])
    ),
    provideAnimations(),
    MessageService,
    { provide: LOCALE_ID, useValue: 'es' },
    ]
    
};