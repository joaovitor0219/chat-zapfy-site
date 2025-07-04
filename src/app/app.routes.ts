import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        loadComponent: () => import('./core/paginas/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'inicio',
        loadComponent: () => import('./core/paginas/inicio/inicio.component').then(m => m.InicioComponent)
      }
    ]
  }
];
