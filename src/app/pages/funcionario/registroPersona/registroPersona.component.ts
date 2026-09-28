// src/app/pages/funcionario/registroPersona/registroPersona.component.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

import {
  ComponentCardComponent,
  LabelComponent,
  InputFieldComponent,
  SelectComponent,
  CheckboxComponent,
  DatePickerComponent,
  ButtonComponent,
  ModalComponent,
  AlertComponent,
  Option
} from '@ubo/ui-shared';

import { PersonaService } from '../../../services/persona.service';
import { Persona } from '../../../models/docente.model';

@Component({
  selector: 'app-registro-persona',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentCardComponent,
    LabelComponent,
    InputFieldComponent,
    SelectComponent,
    CheckboxComponent,
    DatePickerComponent,
    ButtonComponent,
    ModalComponent,
    AlertComponent
  ],
  templateUrl: './registroPersona.component.html',
  styleUrl: './registroPersona.component.css'
})
export class RegistroPersonaComponent {
  formularioPersona: FormGroup;

  enviado = false;
  cargando = false;

  mensajeExito = '';
  mensajeError = '';

  rutEnEdicion: string | null = null;

  modalBuscadorAbierto = signal(false);
  rutBusqueda = '';
  buscando = false;
  mensajeBusqueda = '';
  personaEncontrada = false;

  perfilOptions: Option[] = [
    { value: 'Docente', label: 'Docente' },
    { value: 'Funcionario', label: 'Funcionario' },
    { value: 'Director', label: 'Director' }
  ];

  sexoOptions: Option[] = [
    { value: 'F', label: 'Femenino' },
    { value: 'M', label: 'Masculino' },
    { value: 'O', label: 'Otro' },
    { value: 'N', label: 'Prefiere no informar' }
  ];

  regionOptions: Option[] = [
    'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo',
    'Valparaíso', 'Metropolitana', "O'Higgins", 'Maule', 'Ñuble', 'Biobío',
    'La Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes'
  ].map(r => ({ value: r, label: r }));

  comunaOptions: Option[] = [
    'Santiago', 'Providencia', 'Las Condes', 'Ñuñoa', 'Maipú',
    'Puente Alto', 'La Florida', 'Valparaíso', 'Viña del Mar', 'Concepción'
  ].map(c => ({ value: c, label: c }));

  gradoAcademicoOptions: Option[] = [
    'Licenciado', 'Magíster', 'Doctor', 'Postdoctorado', 'Sin grado académico'
  ].map(g => ({ value: g, label: g }));

  tipoContratoOptions: Option[] = [
    'Planta', 'Contrata', 'Honorarios', 'Part-time', 'Reemplazo'
  ].map(t => ({ value: t, label: t }));

  jornadaOptions: Option[] = [
    'Diurna', 'Vespertina', 'Ambas'
  ].map(j => ({ value: j, label: j }));

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService
  ) {
    this.formularioPersona = this.fb.group({
      perfil: ['', Validators.required],
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

  private formatearFechaDDMMYYYY(fecha: string | Date): string {
    const d = new Date(fecha);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const anio = d.getFullYear();
    return `${dia}-${mes}-${anio}`;
  }

  guardarPersona(): void {
    this.enviado = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    if (this.formularioPersona.invalid) {
      this.formularioPersona.markAllAsTouched();
      return;
    }

    this.cargando = true;

    const valoresFormulario = this.formularioPersona.value;

    const persona: Persona = {
      ...valoresFormulario,
      fecha_nacimiento: this.formatearFechaDDMMYYYY(valoresFormulario.fecha_nacimiento),
      fecha_ingreso: this.formatearFechaDDMMYYYY(valoresFormulario.fecha_ingreso)
    };

    // Si hay un RUT en edición, actualiza (PUT); si no, crea uno nuevo (POST).
    const peticion$ = this.rutEnEdicion
      ? this.personaService.actualizarPersona(this.rutEnEdicion, persona)
      : this.personaService.registrarPersona(persona);

    peticion$.subscribe({
      next: () => {
        this.mensajeExito = this.rutEnEdicion
          ? 'Persona actualizada correctamente.'
          : 'Persona registrada correctamente.';

        this.formularioPersona.reset({ activo: true });
        this.enviado = false;
        this.cargando = false;
        this.rutEnEdicion = null;
      },
      error: (error: any) => {
        this.cargando = false;

        if (error.status === 422) {
          this.mensajeError = 'Existen datos inválidos. Revise el formulario.';
        } else if (error.status === 401) {
          this.mensajeError = 'No autorizado. Revise token o credenciales.';
        } else if (error.status === 404) {
          this.mensajeError = 'No se encontró el endpoint correspondiente.';
        } else if (error.status === 500) {
          this.mensajeError = 'Error interno en la API.';
        } else if (error.status === 0) {
          this.mensajeError = 'No se pudo conectar con la API. Posible problema de CORS o servidor no disponible.';
        } else {
          this.mensajeError = 'Ocurrió un error al guardar la persona.';
        }
      }
    });
  }

  limpiarFormulario(): void {
    this.formularioPersona.reset({ activo: true });
    this.enviado = false;
    this.mensajeExito = '';
    this.mensajeError = '';
    this.rutEnEdicion = null;
  }

  campoInvalido(nombreCampo: string): boolean {
    const campo = this.formularioPersona.get(nombreCampo);
    return !!(campo && campo.invalid && (campo.dirty || campo.touched || this.enviado));
  }

  private validarRutChileno(control: AbstractControl): ValidationErrors | null {
    const rut = String(control.value || '').replace(/\./g, '').replace(/-/g, '').toUpperCase();

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
    const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : String(dvEsperado);

    return dv === dvCalculado ? null : { rutInvalido: true };
  }

  abrirBuscador(): void {
    this.rutBusqueda = '';
    this.mensajeBusqueda = '';
    this.personaEncontrada = false;
    this.modalBuscadorAbierto.set(true);
  }

  exportarDatos(): void {
    console.log('Exportar datos');
  }

  cerrarBuscador(): void {
    this.modalBuscadorAbierto.set(false);
  }

  buscarPersonaPorRut(): void {
    if (!this.rutBusqueda) {
      return;
    }

    this.buscando = true;
    this.mensajeBusqueda = '';
    this.personaEncontrada = false;

    this.personaService.buscarPorRut(this.rutBusqueda).subscribe({
      next: (persona: Persona) => {
        this.formularioPersona.patchValue(persona);

        this.rutEnEdicion = persona.rut;

        this.mensajeBusqueda = 'Persona encontrada. Datos cargados para edición.';
        this.personaEncontrada = true;
        this.buscando = false;

        setTimeout(() => this.cerrarBuscador(), 800);
      },
      error: (error: any) => {
        this.buscando = false;
        this.personaEncontrada = false;
        this.mensajeBusqueda = error.status === 404
          ? 'No se encontró una persona con ese RUT.'
          : 'Error al buscar la persona.';
      }
    });
  }
}