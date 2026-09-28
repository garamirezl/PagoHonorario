// src/app/pages/docente/postulacionDocente/postulacionDocente.component.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ComponentCardComponent,
  SelectComponent,
  InputFieldComponent,
  ButtonComponent,
  AlertComponent,
  BadgeComponent,
  Option
} from '@ubo/ui-shared';

export interface ClaseDisponible {
  seccion: string;
  nombreClase: string;
  departamento: string;
  jornada: string;
  horario: string;
  horas: number;
}

export interface CursoPostulado extends ClaseDisponible {
  estado: 'Pendiente' | 'Aprobado' | 'Rechazado';
  motivo: string;
}

@Component({
  selector: 'app-postulacion-docente',
  imports: [
    CommonModule,
    FormsModule,
    ComponentCardComponent,
    SelectComponent,
    InputFieldComponent,
    ButtonComponent,
    AlertComponent,
    BadgeComponent
  ],
  templateUrl: './postulacionDocente.component.html',
  styleUrl: './postulacionDocente.component.css'
})
export class PostulacionDocenteComponent {
  periodoOptions: Option[] = [
    { value: '2026 - Semestre 1', label: '2026 - Semestre 1' },
    { value: '2026 - Semestre 2', label: '2026 - Semestre 2' },
    { value: '2025 - Semestre 2', label: '2025 - Semestre 2' }
  ];

  periodoSeleccionado = '';

  // Datos informativos de horas (se cargarían desde la API según el docente/período)
  horasPorContrato = 20;

  // Búsqueda de clases disponibles
  busquedaClase = '';

  // Catálogo simulado de clases disponibles para postular
  private clasesDisponibles: ClaseDisponible[] = [
    {
      seccion: 'A-101',
      nombreClase: 'Bases de Datos I',
      departamento: 'Ingeniería Informática',
      jornada: 'Diurna',
      horario: 'Lunes/Miércoles 08:00-10:00',
      horas: 4
    },
    {
      seccion: 'B-202',
      nombreClase: 'Bases de Datos II',
      departamento: 'Ingeniería Informática',
      jornada: 'Vespertina',
      horario: 'Martes/Jueves 19:00-21:00',
      horas: 4
    },
    {
      seccion: 'C-303',
      nombreClase: 'Cálculo I',
      departamento: 'Ciencias Básicas',
      jornada: 'Diurna',
      horario: 'Lunes/Miércoles/Viernes 09:00-10:00',
      horas: 3
    },
    {
      seccion: 'D-404',
      nombreClase: 'Física General',
      departamento: 'Ciencias Básicas',
      jornada: 'Diurna',
      horario: 'Martes/Jueves 10:00-12:00',
      horas: 4
    }
  ];

  // Cursos ya agregados a la postulación (segunda tabla)
  postulaciones: CursoPostulado[] = [];

  guardando = false;
  mensajeExito = '';
  mensajeError = '';

  get resultadosBusqueda(): ClaseDisponible[] {
    const termino = this.busquedaClase.trim().toLowerCase();

    if (!termino) {
      return [];
    }

    const rutsYaAgregados = this.postulaciones.map(p => `${p.seccion}-${p.nombreClase}`);

    return this.clasesDisponibles.filter(clase =>
      clase.nombreClase.toLowerCase().includes(termino) &&
      !rutsYaAgregados.includes(`${clase.seccion}-${clase.nombreClase}`)
    );
  }

  get horasPostuladas(): number {
    return this.postulaciones.reduce((acc, p) => acc + p.horas, 0);
  }

  get horasPendientes(): number {
    return this.horasPorContrato - this.horasPostuladas;
  }

  onPeriodoChange(): void {
    this.busquedaClase = '';
    this.postulaciones = [];
    this.mensajeExito = '';
    this.mensajeError = '';

    // Aquí luego se conecta al servicio real para cargar horas por contrato
    // y clases disponibles del período, y postulaciones ya guardadas:
    // this.postulacionService.obtenerContexto(this.periodoSeleccionado)
    //   .subscribe(data => { ... });
  }

  agregarCurso(clase: ClaseDisponible): void {
    this.postulaciones.push({
      ...clase,
      estado: 'Pendiente',
      motivo: ''
    });

    this.busquedaClase = '';
  }

  eliminarCurso(index: number): void {
    this.postulaciones.splice(index, 1);
  }

  badgeColor(estado: string): 'warning' | 'success' | 'error' {
    if (estado === 'Aprobado') return 'success';
    if (estado === 'Rechazado') return 'error';
    return 'warning';
  }

  guardarPostulacion(): void {
    if (!this.periodoSeleccionado) {
      this.mostrarError('Seleccione un período académico.');
      return;
    }

    if (this.postulaciones.length === 0) {
      this.mostrarError('Agregue al menos un curso antes de guardar.');
      return;
    }

    this.guardando = true;

    // Aquí luego se conecta al servicio real:
    // this.postulacionService.guardar(this.periodoSeleccionado, this.postulaciones)
    //   .subscribe({
    //     next: () => {
    //       this.guardando = false;
    //       this.mostrarExito('Postulación guardada correctamente.');
    //     },
    //     error: () => {
    //       this.guardando = false;
    //       this.mostrarError('Ocurrió un error al guardar la postulación.');
    //     }
    //   });

    setTimeout(() => {
      this.guardando = false;
      this.mostrarExito('Postulación guardada correctamente.');
    }, 800);
  }

  private mostrarExito(texto: string): void {
    this.mensajeExito = texto;
    this.mensajeError = '';
    setTimeout(() => { this.mensajeExito = ''; }, 3000);
  }

  private mostrarError(texto: string): void {
    this.mensajeError = texto;
    this.mensajeExito = '';
    setTimeout(() => { this.mensajeError = ''; }, 3000);
  }
}