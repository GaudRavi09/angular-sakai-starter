import { Users } from './users';
import { Routes } from '@angular/router';
import { UserForm } from './components/user-form/user-form';
import { MainLayout } from '@/layout/main-layout/main-layout';

export default [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Users },
      { path: 'add', component: UserForm },
      { path: 'edit/:id', component: UserForm }
    ]
  }
] as Routes;
