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

import { routes } from './app.routes';
import { AuthApplication } from './auth/application/auth.application';
import { AuthInfrastructure } from './auth/infrastructure/auth.infrastructure';
import { LogService } from './core/services/log.service';
import { LayoutModule } from './modules/layout/layout.module';
import { StorageApplication } from './storage/application/storage.application';
import { StorageAdapter } from './storage/infrastructure/adapters/storage.adapter';
import { StorageInfrastructure } from './storage/infrastructure/storage.infrastructure';

export const LAYOUT_OPTIONS = new InjectionToken('LAYOUT_OPTIONS');

//const guards = [AuthenticationGuard];
const infrastructure = [
  StorageInfrastructure,
  StorageAdapter,
  AuthInfrastructure,
];
const application = [StorageApplication, AuthApplication];

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
    //...guards,
    ...infrastructure,
    ...application,
  ],
};
