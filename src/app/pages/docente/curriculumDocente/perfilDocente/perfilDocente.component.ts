// src/app/pages/docente/curriculumDocente/perfilDocente/perfilDocente.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  LabelComponent,
  InputFieldComponent,
  SelectComponent,
  FileInputComponent,
  ButtonComponent,
  AlertComponent,
  Option
} from '@ubo/ui-shared';

@Component({
  selector: 'app-perfil-docente',
  imports: [
    LabelComponent,
    InputFieldComponent,
    SelectComponent,
    FileInputComponent,
    ButtonComponent,
    AlertComponent
  ],
  templateUrl: '.perfilDocente.component.html',
  styleUrl: './perfilDocente.component.css'
})

export class PerfilDocenteComponent {
  formularioPerfil: FormGroup;
  enviado = false;
  guardando = false;
  mensajeExito = '';
  mensajeError = '';
  archivoCertificado : File | null = null;

  estadoCivilOptions: Option[] = [
    { value: '1', label: 'Soltero/a' },
    { value: '2', label: 'Casado/a' },
    { value: '3', label: 'Divorciado/a' },
    { value: '4', label: 'Viudo/a' }
  ];

  nacionalidadOptions: Option[] = [
    'Chilena','Argentina','Peruana','Boliviana','Colombiana,Ecuatoriana','Venezolana','Uruguaya','Paraguaya','Brasileña','Otra']
    .map(n => ({ value: n, label: n }));

    constructor(private readonly fb: FormBuilder) {
      this.formularioPerfil = this.fb.group({
        nombre: [{ value: '', disabled: true }],
        rut: [{ value: '', disabled: true }],
        profesion: [{ value: '', disabled: true }],
        grado: [{ value: '', disabled: true }],
        tipoContrato: [{ value: '', disabled: true }],

        estadoCivil: ['', Validators.required],
        nacionalidad: ['', Validators.required],
        direccion: ['', Validators.required],
        telefono: ['', [Validators.required, Validators.pattern(/^[+]\d{9,12}$/)]],
        celular: ['', [Validators.required, Validators.pattern(/^[+]\d{9,12}$/)]],
        mail: ['', [Validators.required, Validators.email]]
      });
    }

    onArchivoSeleccionado(event: Event): void {
      const input = event.target as HTMLInputElement;
      const archivo = input.files?.[0];

      if (!archivo) {
        return;
      }

      if (archivo.type !== 'application/pdf') {
        this.mensajeError = 'Solo se permiten archivos en formato PDF.';
        input.value = '';
      }

      const maxSizeMb = 10;
      if (archivo.size > maxSizeMb * 1024 * 1014) {
        this.mostrarError('El archivo cargado excede el tamaño máximo de ${maxSizeMb}MB.');
        input.value ='';
      }
    }
  }