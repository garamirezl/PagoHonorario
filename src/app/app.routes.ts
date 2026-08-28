// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { RegistroDocenteComponent } from './pages/funcionario/registroDocente/registroDocente.component';
import { CargaAcademicaComponent } from './pages/docente/cargaAcademica/cargaAcademica.component';
import { CargaBoletaComponent } from './pages/docente/cargaBoleta/cargaBoleta.component';
import { ParametrizacionPeriodoComponent } from './pages/funcionario/parametrizacionPeriodo/parametrizacionPeriodo.component';
import { ParametrizacionGradoComponent } from './pages/funcionario/parametrizacionGrado/parametrizacionGrado.component';
import { ParametrizacionPagoAdicionalComponent } from './pages/funcionario/parametrizacionPagoAdicional/parametrizacionPagoAdicional.component';
import { SignIn } from './pages/login/login.component';

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
    path: 'cargaBoleta',
    component: CargaBoletaComponent
  },
  {
    path: 'parametrizacionPeriodo',
    component: ParametrizacionPeriodoComponent
  },
  {
    path: 'parametrizacionGrado',
    component: ParametrizacionGradoComponent
  },
  {
    path: 'parametrizacionPagoAdicional',
    component: ParametrizacionPagoAdicionalComponent
  },
  {
    path: 'login',
    component: SignIn
  },
  {
    path: '**',
    redirectTo: 'registroDocente'
  }
];