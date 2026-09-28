// src/app/pages/administradorPersona/administradorPersona.component.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ComponentCardComponent,
  SelectComponent,
  CheckboxComponent,
  ButtonComponent,
  AlertComponent,
  Option
} from '@ubo/ui-shared';

export interface PersonalRow {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  perfil: string;
  estado: string;
  seleccionado: boolean;
}

@Component({
  selector: 'app-administrador-personal',
  imports: [
    CommonModule,
    FormsModule,
    ComponentCardComponent,
    SelectComponent,
    CheckboxComponent,
    ButtonComponent,
    AlertComponent
  ],
  templateUrl: './administradorPersona.component.html',
  styleUrl: './administradorPersona.component.css'
})
export class AdministradorPersonaComponent {
  perfilOptions: Option[] = [
    { value: 'Docente', label: 'Docente' },
    { value: 'Funcionario/a', label: 'Funcionario/a' },
    { value: 'Director/a', label: 'Director/a' }
  ];

  estadoOptions: Option[] = [
    { value: 'Activo', label: 'Activo' },
    { value: 'Bloqueado', label: 'Bloqueado' }
  ];

  personal: PersonalRow[] = [
    {
      id: 1,
      nombre: 'Juan',
      apellidoPaterno: 'Pérez',
      apellidoMaterno: 'Soto',
      perfil: 'Docente',
      estado: 'Activo',
      seleccionado: false
    },
    {
      id: 2,
      nombre: 'María',
      apellidoPaterno: 'González',
      apellidoMaterno: 'Ramírez',
      perfil: 'Funcionario/a',
      estado: 'Activo',
      seleccionado: false
    },
    {
      id: 3,
      nombre: 'Andrea',
      apellidoPaterno: 'Muñoz',
      apellidoMaterno: 'Castro',
      perfil: 'Director/a',
      estado: 'Bloqueado',
      seleccionado: false
    }
  ];

  guardando = false;
  mensajeExito = '';
  mensajeError = '';

  get haySeleccionados(): boolean {
    return this.personal.some(p => p.seleccionado);
  }

  guardarCambios(): void {
    this.guardando = true;

    // Aquí luego se conecta al servicio real:
    // this.administradorPersonaService.actualizarMasivo(this.personal)
    //   .subscribe({
    //     next: () => {
    //       this.guardando = false;
    //       this.mostrarExito('Cambios guardados correctamente.');
    //     },
    //     error: () => {
    //       this.guardando = false;
    //       this.mostrarError('Ocurrió un error al guardar los cambios.');
    //     }
    //   });

    setTimeout(() => {
      this.guardando = false;
      this.mostrarExito('Cambios guardados correctamente.');
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