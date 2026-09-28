// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { RegistroPersonaComponent } from './pages/funcionario/registroPersona/registroPersona.component';
import { CargaAcademicaComponent } from './pages/docente/cargaAcademica/cargaAcademica.component';
import { CargaBoletaComponent } from './pages/docente/cargaBoleta/cargaBoleta.component';
import { ParametrizacionPeriodoComponent } from './pages/funcionario/parametrizacionPeriodo/parametrizacionPeriodo.component';
import { ParametrizacionGradoComponent } from './pages/funcionario/parametrizacionGrado/parametrizacionGrado.component';
import { ParametrizacionPagoAdicionalComponent } from './pages/funcionario/parametrizacionPagoAdicional/parametrizacionPagoAdicional.component';
import { ParametrizacionGlobalComponent } from './pages/funcionario/parametrizacionGlobal/parametrizacionGlobal.component';
import { AdministradorPersonaComponent } from './pages/funcionario/administradorPersona/administradorPersona.component';
import { PostulacionDocenteComponent } from './pages/docente/postulacionDocente/postulacionDocente.component';
import { SeleccionDocenteComponent } from './pages/directores/seleccionDocente/seleccionDocente.component';
import { CurriculumDocenteComponent } from './pages/docente/curriculumDocente/curriculumDocente.component';
import { SignIn } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'registroPersona',
    pathMatch: 'full'
  },
  {
    path: 'registroPersona',
    component: RegistroPersonaComponent
  },
  {
    path: 'postulacionDocente',
    component: PostulacionDocenteComponent
  },
  {
    path: 'seleccionDocente',
    component: SeleccionDocenteComponent
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
    path: 'parametrizacionGlobal',
    component: ParametrizacionGlobalComponent
  },
  {
    path: 'administradorPersona',
    component: AdministradorPersonaComponent
  },
  {
    path: 'curriculumDocente',
    component: CurriculumDocenteComponent
  },
  {
    path: 'login',
    component: SignIn
  },
  {
    path: '**',
    redirectTo: 'registroPersona'
  }
];