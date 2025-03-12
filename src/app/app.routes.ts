import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Importamos el Guard

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) 
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent), 
    canActivate: [AuthGuard] 
  },
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  }, // Redirigir a login por defecto
  { 
    path: '**', 
    redirectTo: 'login' 
  } // Cualquier ruta desconocida redirige a login
];