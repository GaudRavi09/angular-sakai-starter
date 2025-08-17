import { Routes } from '@angular/router';
import { Login } from '@/pages/login/login';
import { Error } from '@/pages/error/error';
import { NotFound } from '@/pages/not-found/not-found';
import { Dashboard } from '@/pages/dashboard/dashboard';
import { MainLayout } from '@/layout/main-layout/main-layout';
import { AccessDenied } from '@/pages/access-denied/access-denied';

export const appRoutes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [{ path: '', component: Dashboard }]
  },
  { path: 'login', component: Login },
  { path: 'error', component: Error },
  { path: 'not-found', component: NotFound },
  { path: 'access-denied', component: AccessDenied },
  { path: 'users', loadChildren: () => import('./app/pages/users/users.routes') },
  { path: '**', redirectTo: '/not-found' }
];
