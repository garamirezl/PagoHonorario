// src/app/pages/funcionario/registroDocente.component.ts

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

import { DocenteService } from '../../../services/docente.service';
import { Docente } from '../../../models/docente.model';

@Component({
  selector: 'app-registroDocente',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registroDocente.component.html',
  styleUrl: './registroDocente.component.css'
})
export class RegistroDocenteComponent {
  formularioDocente: FormGroup;

  enviado = false;
  cargando = false;

  mensajeExito = '';
  mensajeError = '';

  regiones = [
    'Arica y Parinacota',
    'Tarapacá',
    'Antofagasta',
    'Atacama',
    'Coquimbo',
    'Valparaíso',
    'Metropolitana',
    'O’Higgins',
    'Maule',
    'Ñuble',
    'Biobío',
    'La Araucanía',
    'Los Ríos',
    'Los Lagos',
    'Aysén',
    'Magallanes'
  ];

  comunas = [
    'Santiago',
    'Providencia',
    'Las Condes',
    'Ñuñoa',
    'Maipú',
    'Puente Alto',
    'La Florida',
    'Valparaíso',
    'Viña del Mar',
    'Concepción'
  ];

  gradosAcademicos = [
    'Licenciado',
    'Magíster',
    'Doctor',
    'Postdoctorado',
    'Sin grado académico'
  ];

  tiposContrato = [
    'Planta',
    'Contrata',
    'Honorarios',
    'Part-time',
    'Reemplazo'
  ];

  jornadas = [
    'Diurna',
    'Vespertina',
    'Ambas'
  ];

  // Toolbar
  menuHerramientasAbierto = false;

  // Modal buscador
  modalBuscadorAbierto = false;
  rutBusqueda = '';
  buscando = false;
  mensajeBusqueda = '';
  docenteEncontrado = false;

  constructor(
    private fb: FormBuilder,
    private docenteService: DocenteService
  ) {
    this.formularioDocente = this.fb.group({
      rut: ['', [Validators.required, this.validarRutChileno]],

      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellido_paterno: ['', [Validators.required, Validators.minLength(2)]],
      apellido_materno: ['', [Validators.required, Validators.minLength(2)]],

      fecha_nacimiento: ['', Validators.required],
      sexo: ['', Validators.required],

      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9+ ]{8,15}$/)]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],

      region: ['', Validators.required],
      comuna: ['', Validators.required],

      titulo_profesional: ['', [Validators.required, Validators.minLength(3)]],
      grado_academico: ['', Validators.required],
      especialidad: ['', [Validators.required, Validators.minLength(3)]],

      tipo_contrato: ['', Validators.required],
      jornada: ['', Validators.required],
      fecha_ingreso: ['', Validators.required],

      activo: [true]
    });
  }

  guardarDocente(): void {
    this.enviado = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    if (this.formularioDocente.invalid) {
      this.formularioDocente.markAllAsTouched();
      return;
    }

    this.cargando = true;

    const docente: Docente = this.formularioDocente.value;

    this.docenteService.registrarDocente(docente).subscribe({
      next: (response) => {
        console.log('Respuesta API:', response);

        this.mensajeExito = 'Docente registrado correctamente.';

        this.formularioDocente.reset({
          activo: true
        });

        this.enviado = false;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al registrar docente:', error);

        this.cargando = false;

        if (error.status === 422) {
          this.mensajeError = 'Existen datos inválidos. Revise el formulario.';
        } else if (error.status === 401) {
          this.mensajeError = 'No autorizado. Revise token o credenciales.';
        } else if (error.status === 404) {
          this.mensajeError = 'No se encontró el endpoint de registro docente.';
        } else if (error.status === 500) {
          this.mensajeError = 'Error interno en la API.';
        } else if (error.status === 0) {
          this.mensajeError = 'No se pudo conectar con la API. Posible problema de CORS o servidor no disponible.';
        } else {
          this.mensajeError = 'Ocurrió un error al registrar el docente.';
        }
      }
    });
  }

  limpiarFormulario(): void {
    this.formularioDocente.reset({
      activo: true
    });

    this.enviado = false;
    this.mensajeExito = '';
    this.mensajeError = '';
  }

  campoInvalido(nombreCampo: string): boolean {
    const campo = this.formularioDocente.get(nombreCampo);

    return !!(
      campo &&
      campo.invalid &&
      (campo.dirty || campo.touched || this.enviado)
    );
  }

  private validarRutChileno(control: AbstractControl): ValidationErrors | null {
    const rut = String(control.value || '')
      .replace(/\./g, '')
      .replace(/-/g, '')
      .toUpperCase();

    if (!rut || rut.length < 8) {
      return { rutInvalido: true };
    }

    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1);

    if (!/^[0-9]+$/.test(cuerpo)) {
      return { rutInvalido: true };
    }

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += Number(cuerpo[i]) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const dvEsperado = 11 - (suma % 11);

    const dvCalculado =
      dvEsperado === 11 ? '0' :
      dvEsperado === 10 ? 'K' :
      String(dvEsperado);

    return dv === dvCalculado ? null : { rutInvalido: true };
  }

  // ===== Toolbar =====

  abrirBuscador(): void {
    this.modalBuscadorAbierto = true;
    this.rutBusqueda = '';
    this.mensajeBusqueda = '';
    this.docenteEncontrado = false;
  }

  exportarDatos(): void {
    console.log('Exportar datos');
  }

  imprimirFicha(): void {
    this.menuHerramientasAbierto = false;
    console.log('Imprimir ficha');
  }

  verHistorial(): void {
    this.menuHerramientasAbierto = false;
    console.log('Ver historial');
  }

  verConfiguracion(): void {
    this.menuHerramientasAbierto = false;
    console.log('Ver configuración');
  }

  // ===== Modal buscador =====

  cerrarBuscador(): void {
    this.modalBuscadorAbierto = false;
  }

  buscarDocentePorRut(): void {
    if (!this.rutBusqueda) {
      return;
    }

    this.buscando = true;
    this.mensajeBusqueda = '';
    this.docenteEncontrado = false;

    this.docenteService.buscarPorRut(this.rutBusqueda).subscribe({
      next: (docente) => {
        this.formularioDocente.patchValue(docente);
        this.mensajeBusqueda = 'Docente encontrado. Datos cargados.';
        this.docenteEncontrado = true;
        this.buscando = false;

        setTimeout(() => {
          this.cerrarBuscador();
        }, 800);
      },
      error: (error) => {
        this.buscando = false;
        this.docenteEncontrado = false;

        if (error.status === 404) {
          this.mensajeBusqueda = 'No se encontró un docente con ese RUT.';
        } else {
          this.mensajeBusqueda = 'Error al buscar el docente.';
        }
      }
    });
  }
}