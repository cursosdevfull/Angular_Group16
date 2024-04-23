import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
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
import { HeaderInterceptor } from './core/interceptors/header.interceptor';
import { LogService } from './core/services/log.service';
import { CourseApplication } from './course/application/course.application';
import { CourseInfrastructure } from './course/infrastructure/course.infrastructure';
import { LayoutModule } from './modules/layout/layout.module';
import { ScheduleApplication } from './schedule/application/schedule.application';
import { ScheduleInfrastructure } from './schedule/infrastructure/schedule.infrastructure';
import { StorageApplication } from './storage/application/storage.application';
import { StorageAdapter } from './storage/infrastructure/adapters/storage.adapter';
import { StorageInfrastructure } from './storage/infrastructure/storage.infrastructure';
import { UserApplication } from './user/application/user.application';
import { UserInfrastructure } from './user/infrastructure/user.infrastructure';

export const LAYOUT_OPTIONS = new InjectionToken('LAYOUT_OPTIONS');

//const guards = [AuthenticationGuard];
const infrastructure = [
  StorageInfrastructure,
  StorageAdapter,
  AuthInfrastructure,
  CourseInfrastructure,
  ScheduleInfrastructure,
  UserInfrastructure,
];
const application = [
  StorageApplication,
  AuthApplication,
  CourseApplication,
  ScheduleApplication,
  UserApplication,
];

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      LayoutModule.forRoot({ showMenu: false, showHeader: false })
    ),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([HeaderInterceptor])),
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
