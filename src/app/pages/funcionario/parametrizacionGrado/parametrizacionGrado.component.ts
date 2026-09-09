// src/app/pages/parametrizacionGrado/parametrizacionGrado.component.ts

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface ValorCarrera {
  carrera: string;
  valor: number | null;
}

@Component({
  selector: 'app-parametrizacion-grado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parametrizacionGrado.component.html',
  styleUrl: './parametrizacionGrado.component.css'
})
export class ParametrizacionGradoComponent {
  periodosAcademicos = [
    '2026 - Semestre 1',
    '2026 - Semestre 2',
    '2025 - Semestre 2'
  ];

  grados = ['Doctor', 'Magíster', 'Licenciado'];

  carreras = [
    'Ingeniería Civil Informática',
    'Psicología',
    'Enfermería',
    'Derecho',
    'Kinesiología',
    'Medicina Veterinaria'
  ];

  periodoSeleccionado = '';
  gradoSeleccionado = '';

  filas: ValorCarrera[] = [];

  cargandoArchivo = false;
  guardando = false;
  mensajeExito = '';
  mensajeError = '';

  menuHerramientasAbierto = false;

  modalGradosAbierto = false;
  nuevoGrado = '';
  nuevoGradoInvalido = false;

  onPeriodoChange(): void {
    this.gradoSeleccionado = '';
    this.filas = [];
  }

  onGradoChange(): void {
    if (!this.gradoSeleccionado) {
      this.filas = [];
      return;
    }

    this.filas = [];
  }

  agregarFila(): void {
    this.filas.push({ carrera: '', valor: null });
  }

  guardarValores(): void {
    const filaInvalida = this.filas.some(f => !f.carrera || f.valor === null || f.valor === undefined);

    if (filaInvalida) {
      this.mostrarError('Complete carrera y valor en todos los registros.');
      return;
    }

    this.guardando = true;

    setTimeout(() => {
      this.guardando = false;
      this.mostrarExito('Valores guardados correctamente.');
    }, 800);
  }

  onArchivoSeleccionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (!archivo) {
      return;
    }

    const extensionesPermitidas = ['csv', 'xlsx', 'xls'];
    const extension = archivo.name.split('.').pop()?.toLowerCase() || '';

    if (!extensionesPermitidas.includes(extension)) {
      this.mostrarError('Formato no permitido. Use CSV o Excel.');
      input.value = '';
      return;
    }

    this.cargandoArchivo = true;

    setTimeout(() => {
      this.filas = [
        { carrera: 'Ingeniería Civil Informática', valor: 45000 },
        { carrera: 'Psicología', valor: 38000 },
        { carrera: 'Enfermería', valor: 42000 }
      ];
      this.cargandoArchivo = false;
      this.mostrarExito('Archivo cargado correctamente.');
    }, 1000);

    input.value = '';
  }

  abrirModalGrados(): void {
    this.menuHerramientasAbierto = false;
    this.nuevoGrado = '';
    this.nuevoGradoInvalido = false;
    this.modalGradosAbierto = true;
  }

  cerrarModalGrados(): void {
    this.modalGradosAbierto = false;
    this.nuevoGrado = '';
    this.nuevoGradoInvalido = false;
  }

  agregarGrado(): void {
    const nombre = this.nuevoGrado.trim();

    const yaExiste = this.grados.some(
      g => g.toLowerCase() === nombre.toLowerCase()
    );

    if (!nombre || yaExiste) {
      this.nuevoGradoInvalido = true;
      return;
    }

    this.grados.push(nombre);
    this.nuevoGrado = '';
    this.nuevoGradoInvalido = false;
  }

  eliminarGrado(index: number): void {
    const grado = this.grados[index];

    this.grados.splice(index, 1);

    if (this.gradoSeleccionado === grado) {
      this.gradoSeleccionado = '';
      this.filas = [];
    }
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