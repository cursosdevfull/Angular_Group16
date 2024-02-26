import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { LogService } from './core/services/log.service';
import { CourseApplication } from './course/application/course.application';
import { CourseInfrastructure } from './course/infrastructure/presentation/course.infrastructure';

export const LAYOUT_OPTIONS = new InjectionToken('LAYOUT_OPTIONS');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    CourseInfrastructure,
    CourseApplication,
    LogService,
    {
      provide: LAYOUT_OPTIONS,
      useValue: {
        menu: { visible: false },
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
  ],
};
