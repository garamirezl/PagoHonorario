// src/app/pages/docente/cargaAcademica.component.ts

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  AlertComponent,
  AuthPageLayoutComponent,
  ButtonComponent,
  CheckboxComponent,
  InputFieldComponent,
  LabelComponent,
} from '@ubo/ui-shared';

export interface DesgloseItem {
  curso: string;
  monto: number;
  horas: number;
}

export interface Solicitud {
  id: number;
  rut: string;
  nombre: string;
  descripcion: string;
  monto: number;
  fecha: string;
  estado: 'pendiente' | 'aceptado' | 'rechazado';
  desglose: DesgloseItem[];
}

@Component({
  selector: 'app-carga-academica',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthPageLayoutComponent,
    LabelComponent,
    InputFieldComponent,
    CheckboxComponent,
    ButtonComponent,
    AlertComponent
  ],
  templateUrl: './cargaAcademica.component.html',
  styleUrl: './cargaAcademica.component.css'
})
export class CargaAcademicaComponent {
  solicitud: Solicitud | null = {
    id: 1,
    rut: '12345678-9',
    nombre: 'Juan Pérez',
    descripcion: 'Otoño 2026',
    monto: 450000,
    fecha: '2026-04-30',
    estado: 'pendiente',
    desglose: [
      { curso: 'Horas clases', monto: 100000, horas: 20 },
      { curso: 'Horas preparación', monto: 130000, horas: 10 },
      { curso: 'Horas asesoría', monto: 0, horas: 30 }
    ]
  };

  mensajeExito = '';

  modalDesgloseAbierto = false;
  comentario = '';
  procesando = false;

  abrirModalDesglose(): void {
    this.comentario = '';
    this.modalDesgloseAbierto = true;
  }

  cerrarModalDesglose(): void {
    this.comentario = '';
    this.modalDesgloseAbierto = false;
  }

  aceptarSolicitud(): void {
    if (!this.solicitud) {
      return;
    }

    this.procesando = true;

    this.solicitud.estado = 'aceptado';
    this.mostrarMensaje(`Solicitud de ${this.solicitud.nombre} aceptada.`);

    this.procesando = false;
    this.cerrarModalDesglose();
  }

  rechazarSolicitud(): void {
    if (!this.solicitud) {
      return;
    }

    this.procesando = true;

    this.solicitud.estado = 'rechazado';
    this.mostrarMensaje(`Solicitud de ${this.solicitud.nombre} rechazada.`);

      this.procesando = false;
      this.cerrarModalDesglose();
  }

  private mostrarMensaje(texto: string): void {
    this.mensajeExito = texto;

    setTimeout(() => {
      this.mensajeExito = '';
    }, 3000);
  }
}