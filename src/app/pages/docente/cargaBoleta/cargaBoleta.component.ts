// src/app/pages/docente/cargaDocumento.component.ts

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface Boleta {
  id: number;
  periodoAcademico: string;
  valorBruto: number;
  impuestoRetenido: number;
  fechaLimite: string; // formato 'YYYY-MM-DD'
  archivo?: File;
  archivoNombre?: string;
  archivoCargado?: boolean;
  subiendo?: boolean;
}

@Component({
  selector: 'app-carga-boleta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cargaBoleta.component.html',
  styleUrl: './cargaBoleta.component.css',
})
export class CargaBoletaComponent {
  boletas: Boleta[] = [
    {
      id: 1,
      periodoAcademico: '2026 - Semestre 1',
      valorBruto: 500000,
      impuestoRetenido: 50000,
      fechaLimite: '2026-08-20'
    },
    {
      id: 2,
      periodoAcademico: '2025 - Semestre 2',
      valorBruto: 420000,
      impuestoRetenido: 42000,
      fechaLimite: '2026-01-10'
    }
  ];

  mensajeExito = '';
  mensajeError = '';

  esFechaVencida(fechaLimite: string): boolean {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fecha = new Date(fechaLimite + 'T00:00:00');

    return fecha < hoy;
  }

  onArchivoSeleccionado(event: Event, boleta: Boleta): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (!archivo) {
      return;
    }

    const extensionesPermitidas = ['pdf'];
    const extension = archivo.name.split('.').pop()?.toLowerCase() || '';

    if (!extensionesPermitidas.includes(extension)) {
      this.mostrarError('Formato no permitido. Usar PSF. JPG o PNG.');
      input.value = '';
      return;
    }

    const maxSizeMb = 5;
    if (archivo.size > maxSizeMb * 1024 * 1024) {
      this.mostrarError(`Archivo demasiado grande. Máximo ${maxSizeMb}MB.`);
      input.value = '';
      return;
    }

    boleta.archivo = archivo;
    boleta.archivoNombre = archivo.name;
    boleta.archivoCargado = false;

    this.subirDocumento(boleta);
  }

  private subirDocumento(boleta: Boleta): void {
    boleta.subiendo = true;

    setTimeout(() => {
      boleta.archivoCargado = true;
      boleta.subiendo = false;
      this.mostrarExito('Archivo subido exitosamente.');
    }, 2000);
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