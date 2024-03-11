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
import { LogService } from './core/services/log.service';
import { CourseApplication } from './course/application/course.application';
import { CourseInfrastructure } from './course/infrastructure/course.infrastructure';
import { LayoutModule } from './modules/layout/layout.module';

export const LAYOUT_OPTIONS = new InjectionToken('LAYOUT_OPTIONS');

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      LayoutModule.forRoot({ showMenu: true, showHeader: true })
    ),
    provideRouter(routes),
    CourseInfrastructure,
    CourseApplication,
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
    {
      provide: 'DATABASE_TYPE',
      useValue: 'mongodb',
    },
    {
      provide: 'DATABASE_HOST',
      useValue: 'localhost',
    },
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: (type: string, host: string) => {
        return `${type}://${host}`;
      },
      deps: ['DATABASE_TYPE', 'DATABASE_HOST'],
    },
    provideAnimationsAsync(),
  ],
};