// src/app/pages/funcionario/seleccionDocente/seleccionDocente.component.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ComponentCardComponent,
  SelectComponent,
  ButtonComponent,
  AlertComponent,
  BadgeComponent,
  ModalComponent,
  Option
} from '@ubo/ui-shared';

export interface DocentePostulado {
  docente: string;
  horasAsignadas: number;
  estado: 'Aprobado' | 'Rechazado' | 'En Postulación';
  motivo: string;
  cvUrl: string;
}

export interface AsignaturaRow {
  id: number;
  carreraDepartamento: string;
  nombreAsignatura: string;
  codEspecRamo: string;
  horas: number;
  horario: string;
  estado: 'Con Docente' | 'Sin Docente';
  docentesPostulados: DocentePostulado[];
}

@Component({
  selector: 'app-seleccion-docente',
  imports: [
    CommonModule,
    FormsModule,
    ComponentCardComponent,
    SelectComponent,
    ButtonComponent,
    AlertComponent,
    BadgeComponent,
    ModalComponent
  ],
  templateUrl: './seleccionDocente.component.html',
  styleUrl: './seleccionDocente.component.css'
})
export class SeleccionDocenteComponent {
  periodoOptions: Option[] = [
    { value: '2026 - Semestre 1', label: '2026 - Semestre 1' },
    { value: '2026 - Semestre 2', label: '2026 - Semestre 2' },
    { value: '2025 - Semestre 2', label: '2025 - Semestre 2' }
  ];

  estadoDocenteOptions: Option[] = [
    { value: 'Aprobado', label: 'Aprobado' },
    { value: 'Rechazado', label: 'Rechazado' }
  ];

  periodoSeleccionado = '';

  asignaturas: AsignaturaRow[] = [];

  filtroActivo: 'todos' | 'conDocente' | 'sinDocente' = 'todos';

  modalDocentesAbierto = signal(false);
  asignaturaSeleccionada: AsignaturaRow | null = null;
  guardandoModal = false;

  mensajeExito = '';
  mensajeError = '';

  get cursosTotales(): number {
    return this.asignaturas.length;
  }

  get cursosConDocente(): number {
    return this.asignaturas.filter(a => a.estado === 'Con Docente').length;
  }

  get cursosSinDocente(): number {
    return this.asignaturas.filter(a => a.estado === 'Sin Docente').length;
  }

  get porcentajeAvance(): number {
    if (this.cursosTotales === 0) {
      return 0;
    }
    return Math.round((this.cursosConDocente / this.cursosTotales) * 100);
  }

  get asignaturasFiltradas(): AsignaturaRow[] {
    if (this.filtroActivo === 'conDocente') {
      return this.asignaturas.filter(a => a.estado === 'Con Docente');
    }

    if (this.filtroActivo === 'sinDocente') {
      return this.asignaturas.filter(a => a.estado !== 'Con Docente');
    }

    return this.asignaturas;
  }

  seleccionarFiltro(filtro: 'todos' | 'conDocente' | 'sinDocente'): void {
    this.filtroActivo = filtro;
  }

  onPeriodoChange(): void {
    this.mensajeExito = '';
    this.mensajeError = '';

    if (!this.periodoSeleccionado) {
      this.asignaturas = [];
      return;
    }

    // Aquí luego se conecta al servicio real:
    // this.seleccionDocenteService.obtenerAsignaturas(this.periodoSeleccionado)
    //   .subscribe({
    //     next: (data) => this.asignaturas = data,
    //     error: () => this.mostrarError('No se pudieron cargar las asignaturas.')
    //   });

    // Datos de ejemplo mientras no hay API conectada:
    this.asignaturas = [
      {
        id: 1,
        carreraDepartamento: 'Ingeniería Informática',
        nombreAsignatura: 'Bases de Datos I',
        codEspecRamo: 'INF-201',
        horas: 4,
        horario: 'Lunes/Miércoles 08:00-10:00',
        estado: 'Sin Docente',
        docentesPostulados: [
          {
            docente: 'Juan Pérez Soto',
            horasAsignadas: 4,
            estado: 'En Postulación',
            motivo: '',
            cvUrl: '#'
          },
          {
            docente: 'María González Ramírez',
            horasAsignadas: 4,
            estado: 'En Postulación',
            motivo: '',
            cvUrl: '#'
          }
        ]
      },
      {
        id: 2,
        carreraDepartamento: 'Ciencias Básicas',
        nombreAsignatura: 'Cálculo I',
        codEspecRamo: 'MAT-101',
        horas: 3,
        horario: 'Lunes/Miércoles/Viernes 09:00-10:00',
        estado: 'Con Docente',
        docentesPostulados: [
          {
            docente: 'Andrea Muñoz Castro',
            horasAsignadas: 3,
            estado: 'Aprobado',
            motivo: '',
            cvUrl: '#'
          }
        ]
      },
      {
        id: 3,
        carreraDepartamento: 'Ingeniería Informática',
        nombreAsignatura: 'Física General',
        codEspecRamo: 'FIS-101',
        horas: 4,
        horario: 'Martes/Jueves 10:00-12:00',
        estado: 'Sin Docente',
        docentesPostulados: []
      }
    ];
  }

  abrirModalDocentes(asignatura: AsignaturaRow): void {
    this.asignaturaSeleccionada = asignatura;
    this.modalDocentesAbierto.set(true);
  }

  cerrarModalDocentes(): void {
    this.modalDocentesAbierto.set(false);
    this.asignaturaSeleccionada = null;
  }

  verCV(cvUrl: string): void {
    window.open(cvUrl, '_blank');
  }

  badgeColorEstado(estado: string): 'warning' | 'success' | 'error' {
    if (estado === 'Con Docente' || estado === 'Aprobado') return 'success';
    if (estado === 'Rechazado') return 'error';
    return 'warning'; // 'Sin Docente' y 'En Postulación'
  }

  guardarCambiosModal(): void {
    if (!this.asignaturaSeleccionada) {
      return;
    }

    this.guardandoModal = true;

    // Aquí luego se conecta al servicio real:
    // this.seleccionDocenteService.guardarDocentesPostulados(
    //   this.asignaturaSeleccionada.id,
    //   this.asignaturaSeleccionada.docentesPostulados
    // ).subscribe({
    //   next: () => {
    //     this.guardandoModal = false;
    //     this.mostrarExito('Cambios guardados correctamente.');
    //     this.cerrarModalDocentes();
    //   },
    //   error: () => {
    //     this.guardandoModal = false;
    //     this.mostrarError('Ocurrió un error al guardar los cambios.');
    //   }
    // });

    setTimeout(() => {
      // Si al menos un docente quedó Aprobado, la asignatura pasa a "Con Docente"
      if (this.asignaturaSeleccionada) {
        const hayAprobado = this.asignaturaSeleccionada.docentesPostulados.some(
          d => d.estado === 'Aprobado'
        );
        this.asignaturaSeleccionada.estado = hayAprobado ? 'Con Docente' : 'Sin Docente';
      }

      this.guardandoModal = false;
      this.mostrarExito('Cambios guardados correctamente.');
      this.cerrarModalDocentes();
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