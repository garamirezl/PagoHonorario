// src/app/models/persona.model.ts

export interface Persona {
  perfil: string;
  rut: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
  sexo: string;
  correo: string;
  telefono: string;
  direccion: string;
  region: string;
  comuna: string;
  titulo_profesional: string;
  grado_academico: string;
  especialidad: string;
  tipo_contrato: string;
  jornada: string;
  fecha_ingreso: string;
  activo: boolean;
}