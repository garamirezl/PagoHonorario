// src/app/services/persona.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Persona } from '../models/docente.model';
import { environment } from '../../environments/environment';

/**
 * Servicio encargado de toda la comunicación HTTP con el módulo
 * de personas en la API Laravel (PersonaController). Se inyecta
 * en registroPersona.component.ts para el flujo de crear/buscar/editar.
 */
@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  // URL base del endpoint de personas, ej: http://localhost:8000/api/personas
  private apiUrl = `${environment.apiUrl}/personas`;

  constructor(private http: HttpClient) {}

  /**
   * CREATE — Registra una nueva persona.
   * Llama a POST /api/personas (PersonaController@store).
   */
  registrarPersona(persona: Persona): Observable<any> {
    return this.http.post(this.apiUrl, persona)
      .pipe(catchError(this.manejarError));
  }

  /**
   * READ (listado) — Obtiene todas las personas registradas.
   * Llama a GET /api/personas (PersonaController@index).
   */
  listarPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl)
      .pipe(catchError(this.manejarError));
  }

  /**
   * READ (por RUT) — Busca una persona específica.
   * Llama a GET /api/personas/{rut} (PersonaController@show).
   */
  buscarPorRut(rut: string): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/${rut}`)
      .pipe(catchError(this.manejarError));
  }

  /**
   * UPDATE — Actualiza una persona existente.
   * Llama a PUT /api/personas/{rut} (PersonaController@update).
   */
  actualizarPersona(rut: string, persona: Persona): Observable<any> {
    return this.http.put(`${this.apiUrl}/${rut}`, persona)
      .pipe(catchError(this.manejarError));
  }

  private manejarError(error: HttpErrorResponse) {
    console.error('Error desde API:', error);
    return throwError(() => error);
  }
}