// src/app/pages/docente/curriculumDocente/curriculumDocente.component.ts

import { Component } from '@angular/core';
import { ComponentCardComponent, TabsComponent, TabPanelComponent } from '@ubo/ui-shared';

import { PerfilDocenteComponent } from './perfilDocente/perfilDocente.component';
import { TitulosGradosComponent } from './titulosGrados/titulosGrados.component';

@Component({
  selector: 'app-curriculum-docente',
  imports: [
    ComponentCardComponent,
    TabsComponent,
    TabPanelComponent,
    PerfilDocenteComponent,
    TitulosGradosComponent
  ],
  templateUrl: './curriculumDocente.component.html',
  styleUrl: './curriculumDocente.component.css'
})
export class CurriculumDocenteComponent {
  activeTab = 0; // 0 = Perfil del Docente (pestaña activa por defecto)
}