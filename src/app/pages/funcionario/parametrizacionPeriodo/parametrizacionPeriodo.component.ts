// src/app/pages/parametrizacionPeriodo/parametrizacionPeriodo.component.ts

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface FilaParametrizacion {
  mes: string;
  inicioPago: string;
  finPago: string;
  inicioIntranet: string;
  finIntranet: string;
  fechaCorte: string;
  fechaBoleta: string;
  numeroPago: number | null;
  vigente: boolean;
}

@Component({
  selector: 'app-parametrizacion-periodo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parametrizacionPeriodo.component.html',
  styleUrl: './parametrizacionPeriodo.component.css'
})
export class ParametrizacionPeriodoComponent {
  periodosAcademicos = [
    '2026 - Semestre 1',
    '2026 - Semestre 2',
    '2025 - Semestre 2'
  ];

  meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  periodoSeleccionado = '';
  filas: FilaParametrizacion[] = [];

  guardando = false;
  mensajeExito = '';
  mensajeError = '';

  onPeriodoChange(): void {
    if (!this.periodoSeleccionado) {
      this.filas = [];
      return;
    }

    this.filas = [this.filaVacia()];
  }

  agregarFila(): void {
    this.filas.push(this.filaVacia());
  }

  guardarParametrizacion(): void {
    if (!this.periodoSeleccionado) {
      this.mostrarError('Seleccione un período académico.');
      return;
    }

    this.guardando = true;

    setTimeout(() => {
      this.guardando = false;
      this.mostrarExito('Parametrización guardada correctamente.');
    }, 800);
  }

  private filaVacia(): FilaParametrizacion {
    return {
      mes: '',
      inicioPago: '',
      finPago: '',
      inicioIntranet: '',
      finIntranet: '',
      fechaCorte: '',
      fechaBoleta: '',
      numeroPago: null,
      vigente: true
    };
  }

  private mostrarExito(texto: string): void {
    this.mensajeExito = texto;
    this.mensajeError = '';

    setTimeout(() => {
      this.mensajeExito = '';
    }, 3000);
  }

  private mostrarError(texto: string): void {
    this.mensajeError = texto;
    this.mensajeExito = '';

    setTimeout(() => {
      this.mensajeError = '';
    }, 3000);
  }
}
