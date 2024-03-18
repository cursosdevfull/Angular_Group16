import { Routes } from '@angular/router';

import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { PageLoginComponent } from './core/pages/page-login/page-login.component';
import { CoursePageComponent } from './course/presentation/pages/course-page/course-page.component';
import {
  PageDashboardComponent,
} from './dashboard/infrastructure/presentation/pages/page-dashboard/page-dashboard.component';
import { SchedulePageComponent } from './schedule/presentation/pages/schedule-page/schedule-page.component';
import { UserPageComponent } from './user/presentation/pages/user-page/user-page.component';

export const routes: Routes = [
  {
    path: '',
    component: PageLoginComponent,
    children: [
      { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
      {
        path: 'auth/login',
        component: LoginComponent,
      },
      { path: 'auth/register', component: RegisterComponent },
    ],
  },
  {
    path: 'dashboard',
    component: PageDashboardComponent,
  },
  {
    path: 'course',
    component: CoursePageComponent,
  },
  {
    path: 'user',
    component: UserPageComponent,
  },
  {
    path: 'schedule',
    component: SchedulePageComponent,
  },

  /*   {
    path: 'auth/login',
    component: LoginComponent,
  },
  { path: 'auth/register', component: RegisterComponent }, */
];
