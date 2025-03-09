import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Importamos el Guard

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'profile', loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent), canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];
