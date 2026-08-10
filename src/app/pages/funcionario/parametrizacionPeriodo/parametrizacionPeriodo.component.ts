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

    // Aquí luego se conecta al servicio real para cargar la parametrización existente:
    // this.parametrizacionService.obtenerPorPeriodo(this.periodoSeleccionado)
    //   .subscribe({
    //     next: (data) => this.filas = data,
    //     error: () => this.mostrarError('No se pudo cargar la parametrización.')
    //   });

    // Mientras no hay API conectada, se inicia con una fila vacía:
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

    // Aquí luego se conecta al servicio real:
    // this.parametrizacionService.guardar(this.periodoSeleccionado, this.filas)
    //   .subscribe({
    //     next: () => {
    //       this.guardando = false;
    //       this.mostrarExito('Parametrización guardada correctamente.');
    //     },
    //     error: () => {
    //       this.guardando = false;
    //       this.mostrarError('Ocurrió un error al guardar la parametrización.');
    //     }
    //   });

    // Simulación local mientras no hay API conectada:
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
