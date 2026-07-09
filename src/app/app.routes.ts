// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { RegistroDocenteComponent } from './pages/docente/registroDocente.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'registro-docente',
    pathMatch: 'full'
  },
  {
    path: 'registro-docente',
    component: RegistroDocenteComponent
  },
  {
    path: '**',
    redirectTo: 'registro-docente'
  }
];