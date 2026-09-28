// src/app/pages/docente/curriculumDocente/titulosGrados/titulosGrados.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-titulos-grados',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './titulosGrados.component.html',
  styleUrl: './titulosGrados.component.css'
})
export class TitulosGradosComponent {
  formularioTitulos: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    // Campos pendientes de definir
    this.formularioTitulos = this.fb.group({});
  }
}