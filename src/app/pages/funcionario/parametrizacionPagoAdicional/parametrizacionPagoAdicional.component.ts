// src/app/pages/parametrizacionPagoAdicional/parametrizacionPagoAdicional.component.ts

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface PagoAdicional {
  correlativo: number;
  concepto: string;
  monto: number | null;
}

@Component({
  selector: 'app-parametrizacion-pago-adicional',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parametrizacionPagoAdicional.component.html',
  styleUrl: './parametrizacionPagoAdicional.component.css'
})
export class ParametrizacionPagoAdicionalComponent {
  periodosAcademicos = [
    '2026 - Semestre 1',
    '2026 - Semestre 2',
    '2025 - Semestre 2'
  ];

  tiposPagoAdicional = [
    'Bonos de responsabilidad',
    'Viáticos',
    'Horas extraordinarias',
    'Proyectos de investigación'
  ];

  conceptos = [
    'Bono responsabilidad',
    'Bono desempeño',
    'Viático nacional',
    'Viático internacional',
    'Hora extraordinaria diurna',
    'Hora extraordinaria nocturna'
  ];

  periodoSeleccionado = '';
  tipoPagoSeleccionado = '';

  filas: PagoAdicional[] = [];
  private siguienteCorrelativo = 1;

  guardando = false;
  mensajeExito = '';
  mensajeError = '';

  onPeriodoChange(): void {
    this.tipoPagoSeleccionado = '';
    this.filas = [];
  }

  onTipoPagoChange(): void {
    if (!this.tipoPagoSeleccionado) {
      this.filas = [];
      return;
    }

    //         ? Math.max(...data.map(f => f.correlativo)) + 1

    this.filas = [];
    this.siguienteCorrelativo = 1;
  }

  agregarFila(): void {
    this.filas.push({
      correlativo: this.siguienteCorrelativo,
      concepto: '',
      monto: null
    });

    this.siguienteCorrelativo++;
  }

  eliminarFila(index: number): void {
    this.filas.splice(index, 1);
  }

  guardarPagos(): void {
    const filaInvalida = this.filas.some(f => !f.concepto || f.monto === null || f.monto === undefined);

    if (filaInvalida) {
      this.mostrarError('Complete concepto y monto en todos los registros.');
      return;
    }

    this.guardando = true;

    setTimeout(() => {
      this.guardando = false;
      this.mostrarExito('Pagos adicionales guardados correctamente.');
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