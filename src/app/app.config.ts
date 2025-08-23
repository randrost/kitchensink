import {
  ApplicationConfig, inject, PLATFORM_ID, provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideRouter, TitleStrategy, withViewTransitions} from '@angular/router';
import {routes} from './app.routes';
import {COLOR_SCHEME_LOCAL_KEY, ColorScheme, ColorSchemeStore} from '@elementar-ui/components/color-scheme';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideStore} from '@ngrx/store';
import {provideNativeDateAdapter} from '@angular/material/core';
import {ENVIRONMENT, EnvironmentService, GlobalStore, PageTitleStrategyService} from '@elementar-ui/components/core';
import {environment} from '@environments/environment';
import {isPlatformBrowser} from '@angular/common';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {provideMarkdown} from 'ngx-markdown';
import {provideTranslateService} from '@ngx-translate/core';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideTranslateService({
      lang: 'en',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: 'public/assets/i18n/',
        suffix: '.json'
      })
    }),
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(withEventReplay()),
    ColorSchemeStore,
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideStore(),
    provideNativeDateAdapter(),
    {
      provide: ENVIRONMENT,
      useValue: environment
    },
    provideMarkdown(),
    provideAppInitializer(() => {
      const envService = inject(EnvironmentService);
      const globalStore = inject(GlobalStore);
      const platformId = inject(PLATFORM_ID);
      const colorSchemeStore = inject(ColorSchemeStore);
      return new Promise((resolve, reject) => {
        if (isPlatformBrowser(platformId)) {
          const localColorScheme = localStorage
            ? (localStorage.getItem(COLOR_SCHEME_LOCAL_KEY) as ColorScheme || 'light')
            : 'light';
          // but the best solution set it from backend
          colorSchemeStore.setScheme(localColorScheme);
        }

        globalStore.setPageTitle(envService.getValue('pageTitle'));
        resolve(true);
      });
    }),

    {
      provide: TitleStrategy,
      useClass: PageTitleStrategyService
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance: 'outline'}
    }
  ]
};
