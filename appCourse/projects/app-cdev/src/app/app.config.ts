import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  InjectionToken,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import player from 'lottie-web';
import { provideLottieOptions } from 'ngx-lottie';
import { PerfectScrollbarConfigInterface } from 'ngx-om-perfect-scrollbar';

import { routes } from './app.routes';
import { LogService } from './core/services/log.service';
import { LayoutModule } from './modules/layout/layout.module';

export const LAYOUT_OPTIONS = new InjectionToken('LAYOUT_OPTIONS');

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      LayoutModule.forRoot({ showMenu: false, showHeader: false })
    ),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    LogService,
    provideLottieOptions({
      player: () => player,
    }),
    {
      provide: LAYOUT_OPTIONS,
      useValue: {
        menu: { visible: true },
        toolbar: { visible: false },
        footer: { visible: false },
      },
    },
    provideAnimationsAsync(),
  ],
};
