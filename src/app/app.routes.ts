// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { RegistroDocenteComponent } from './pages/funcionario/registroDocente.component';
import { CargaAcademicaComponent } from './pages/docente/cargaAcademica.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'registroDocente',
    pathMatch: 'full'
  },
  {
    path: 'registroDocente',
    component: RegistroDocenteComponent
  },
  {
    path: 'cargaAcademica',
    component: CargaAcademicaComponent
  },
  {
    path: '**',
    redirectTo: 'registroDocente'
  }
];