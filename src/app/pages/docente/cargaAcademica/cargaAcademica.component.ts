// src/app/pages/docente/cargaAcademica/cargaAcademica.component.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ComponentCardComponent,
  ButtonComponent,
  ModalComponent,
  AlertComponent,
  LabelComponent,
  TextAreaComponent,
  BasicTableThreeComponent,
  TableColumn,
  ActionButton
} from '@ubo/ui-shared';

export interface DesgloseItem {
  curso: string;
  horas: number;
  monto: number;
}

export interface SolicitudRow {
  rut: string;
  nombre: string;
  periodoAcademico: string;
  monto: string;
  fecha: string;
  estado: string;
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
  imports: [
    CommonModule,
    ComponentCardComponent,
    ButtonComponent,
    ModalComponent,
    AlertComponent,
    LabelComponent,
    TextAreaComponent,
    BasicTableThreeComponent
  ],
  templateUrl: './cargaAcademica.component.html',
})
export class CargaAcademicaComponent {
  loading = signal(false);

  private solicitudData: Solicitud | null = {
    id: 1,
    rut: '12345678-9',
    nombre: 'Juan Pérez',
    descripcion: 'Honorarios abril 2026',
    monto: 450000,
    fecha: '2026-04-30',
    estado: 'pendiente',
    desglose: [
      { curso: 'Bases de Datos', horas: 32, monto: 320000 },
      { curso: 'Ayudantía', horas: 10, monto: 90000 },
      { curso: 'Bono desempeño', horas: 0, monto: 40000 }
    ]
  };

  solicitud = signal<Solicitud | null>(this.solicitudData);

  postulantes = signal<SolicitudRow[]>(this.construirFilas());

  columns = signal<TableColumn<SolicitudRow>[]>([
    { key: 'rut', label: 'RUT' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'periodoAcademico', label: 'Período académico', wrap: true },
    { key: 'monto', label: 'Monto' },
    { key: 'fecha', label: 'Fecha' },
    { key: 'estado', label: 'Estado' }
  ]);

  actionButtons = signal<ActionButton<SolicitudRow>[]>([
    { text: 'Detalle', action: 'detalle' }
  ]);

  successMessage = signal<string | null>(null);

  modalDesgloseAbierto = signal(false);
  comentario = '';
  procesando = false;

  formatearMonto(valor: number): string {
    return '$' + valor.toLocaleString('en-US').replace(/,/g, '.');
  }

  private construirFilas(): SolicitudRow[] {
    const s = this.solicitudData;

    if (!s) {
      return [];
    }

    return [{
      rut: s.rut,
      nombre: s.nombre,
      periodoAcademico: s.descripcion,
      monto: this.formatearMonto(s.monto),
      fecha: s.fecha,
      estado: s.estado
    }];
  }

  refreshList(): void {
    this.loading.set(true);

    // Aquí luego se conecta al servicio real:
    // this.cargaAcademicaService.listar().subscribe({
    //   next: (data) => {
    //     this.solicitudData = data;
    //     this.solicitud.set(data);
    //     this.postulantes.set(this.construirFilas());
    //     this.loading.set(false);
    //   },
    //   error: () => this.loading.set(false)
    // });

    setTimeout(() => {
      this.postulantes.set(this.construirFilas());
      this.loading.set(false);
    }, 500);
  }

  onActionClick(event: { action: string; row: SolicitudRow }): void {
    if (event.action === 'detalle') {
      this.abrirModalDesglose();
    }
  }

  abrirModalDesglose(): void {
    this.comentario = '';
    this.modalDesgloseAbierto.set(true);
  }

  cerrarModalDesglose(): void {
    this.modalDesgloseAbierto.set(false);
    this.comentario = '';
  }

  aceptarSolicitud(): void {
    const s = this.solicitud();

    if (!s) {
      return;
    }

    this.procesando = true;

    // Aquí luego se conecta al servicio real:
    // this.cargaAcademicaService.aceptar(s.id, this.comentario)
    //   .subscribe({ next: () => {...}, error: () => {...} });

    s.estado = 'aceptado';
    this.solicitudData = s;
    this.solicitud.set(s);
    this.postulantes.set(this.construirFilas());

    this.showSuccess(`Solicitud de ${s.nombre} aceptada.`);

    this.procesando = false;
    this.cerrarModalDesglose();
  }

  rechazarSolicitud(): void {
    const s = this.solicitud();

    if (!s) {
      return;
    }

    this.procesando = true;

    // Aquí luego se conecta al servicio real:
    // this.cargaAcademicaService.rechazar(s.id, this.comentario)
    //   .subscribe({ next: () => {...}, error: () => {...} });

    s.estado = 'rechazado';
    this.solicitudData = s;
    this.solicitud.set(s);
    this.postulantes.set(this.construirFilas());

    this.showSuccess(`Solicitud de ${s.nombre} rechazada.`);

    this.procesando = false;
    this.cerrarModalDesglose();
  }

  totalDesglose(): number {
    return this.solicitud()?.desglose.reduce((acc, item) => acc + item.monto, 0) ?? 0;
  }

  private showSuccess(message: string): void {
    this.successMessage.set(message);
    setTimeout(() => this.successMessage.set(null), 4000);
  }
}