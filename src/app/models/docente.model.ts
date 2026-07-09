import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface Docente {
 rut: string;
 nombres: string;
 apellido_paterno: string;
 apellido_materno: string;
 fecha_nacimiento: string;
 sexo: string;
 correo_personal: string;
 telefono: number;
 direccion: string;
 region: string;
 comuna: string;
 fecha_ingreso: string;
 activo: boolean;
}