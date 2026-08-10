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

    // Aquí luego se conecta al servicio real para traer los pagos ya registrados:
    // this.pagoAdicionalService.obtenerPagos(this.periodoSeleccionado, this.tipoPagoSeleccionado)
    //   .subscribe({
    //     next: (data) => {
    //       this.filas = data;
    //       this.siguienteCorrelativo = data.length
    //         ? Math.max(...data.map(f => f.correlativo)) + 1
    //         : 1;
    //     },
    //     error: () => this.mostrarError('No se pudieron cargar los pagos.')
    //   });

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

    // Aquí luego se conecta al servicio real:
    // this.pagoAdicionalService.guardarPagos(this.periodoSeleccionado, this.tipoPagoSeleccionado, this.filas)
    //   .subscribe({
    //     next: () => {
    //       this.guardando = false;
    //       this.mostrarExito('Pagos adicionales guardados correctamente.');
    //     },
    //     error: () => {
    //       this.guardando = false;
    //       this.mostrarError('Ocurrió un error al guardar los pagos.');
    //     }
    //   });

    // Simulación local mientras no hay API conectada:
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