// src/app/pages/parametrizacionGlobal/parametrizacionGlobal.component.ts

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface ProcesoGlobal {
  proceso: string;
  fechaInicio: string;
  fechaFin: string;
}

@Component({
  selector: 'app-parametrizacion-global',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parametrizacionGlobal.component.html',
  styleUrl: './parametrizacionGlobal.component.css'
})
export class ParametrizacionGlobalComponent {
  periodosAcademicos = [
    '2026 - Semestre 1',
    '2026 - Semestre 2',
    '2025 - Semestre 2'
  ];

  procesos = [
    'Carga Académica',
    'Carga de Boleta',
    'Validación de Pagos',
    'Cierre de Período'
  ];

  periodoSeleccionado = '';

  filas: ProcesoGlobal[] = [];

  guardando = false;
  mensajeExito = '';
  mensajeError = '';

  onPeriodoChange(): void {
    if (!this.periodoSeleccionado) {
      this.filas = [];
      return;
    }

    // Aquí luego se conecta al servicio real para cargar la parametrización existente:
    // this.parametrizacionGlobalService.obtenerPorPeriodo(this.periodoSeleccionado)
    //   .subscribe({
    //     next: (data) => this.filas = data,
    //     error: () => this.mostrarError('No se pudo cargar la parametrización.')
    //   });

    this.filas = [];
  }

  agregarFila(): void {
    this.filas.push({ proceso: '', fechaInicio: '', fechaFin: '' });
  }

  guardarParametrizacion(): void {
    const filaInvalida = this.filas.some(f => !f.proceso || !f.fechaInicio || !f.fechaFin);

    if (filaInvalida) {
      this.mostrarError('Complete proceso, fecha de inicio y fecha de fin en todos los registros.');
      return;
    }

    this.guardando = true;

    // Aquí luego se conecta al servicio real:
    // this.parametrizacionGlobalService.guardar(this.periodoSeleccionado, this.filas)
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

    setTimeout(() => {
      this.guardando = false;
      this.mostrarExito('Parametrización guardada correctamente.');
    }, 800);
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