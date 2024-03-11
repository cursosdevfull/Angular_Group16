import { Routes } from '@angular/router';

import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { PageLoginComponent } from './core/pages/page-login/page-login.component';
import { PageDashboardComponent } from './dashboard/infrastructure/presentation/pages/page-dashboard/page-dashboard.component';

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
  /*   {
    path: 'auth/login',
    component: LoginComponent,
  },
  { path: 'auth/register', component: RegisterComponent }, */
];
