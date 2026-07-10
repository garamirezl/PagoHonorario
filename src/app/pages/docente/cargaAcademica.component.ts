// src/app/pages/docente/cargaAcademica.component.ts

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Solicitud {
  id: number;
  rut: string;
  nombre: string;
  descripcion: string;
  monto: number;
  fecha: string;
  estado: 'pendiente' | 'aceptado' | 'rechazado';
  motivoRechazo?: string;
}

@Component({
  selector: 'app-carga-academica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cargaAcademica.component.html',
  styleUrl: './cargaAcademica.component.css'
})
export class CargaAcademicaComponent {
  solicitud: Solicitud | null = {
    id: 1,
    rut: '12345678-9',
    nombre: 'Juan Pérez',
    descripcion: 'Honorarios abril 2026',
    monto: 450000,
    fecha: '2026-04-30',
    estado: 'pendiente'
  };

  mensajeExito = '';

  modalRechazoAbierto = false;
  motivoRechazo = '';
  motivoInvalido = false;
  enviandoRechazo = false;

  aceptarSolicitud(): void {
    if (!this.solicitud) {
      return;
    }

    this.solicitud.estado = 'aceptado';
    this.mostrarMensaje(`Solicitud de ${this.solicitud.nombre} aceptada.`);

    // Aquí luego se conecta al servicio real:
    // this.cargaAcademicaService.aceptar(this.solicitud.id).subscribe(...)
  }

  abrirModalRechazo(): void {
    if (!this.solicitud) {
      return;
    }

    this.motivoRechazo = '';
    this.motivoInvalido = false;
    this.modalRechazoAbierto = true;
  }

  cancelarRechazo(): void {
    this.modalRechazoAbierto = false;
    this.motivoRechazo = '';
    this.motivoInvalido = false;
  }

  enviarRechazo(): void {
    if (!this.motivoRechazo.trim()) {
      this.motivoInvalido = true;
      return;
    }

    if (!this.solicitud) {
      return;
    }

    this.enviandoRechazo = true;

    // Aquí luego se conecta al servicio real:
    // this.cargaAcademicaService.rechazar(this.solicitud.id, this.motivoRechazo)
    //   .subscribe({ next: () => {...}, error: () => {...} });

    this.solicitud.estado = 'rechazado';
    this.solicitud.motivoRechazo = this.motivoRechazo;

    this.mostrarMensaje(`Solicitud de ${this.solicitud.nombre} rechazada.`);

    this.enviandoRechazo = false;
    this.modalRechazoAbierto = false;
  }

  private mostrarMensaje(texto: string): void {
    this.mensajeExito = texto;

    setTimeout(() => {
      this.mensajeExito = '';
    }, 3000);
  }
}