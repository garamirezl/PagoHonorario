// src/app/services/docente.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Docente } from '../models/docente.model';
import { environment } from '../../environments/environment';

/**
 * Servicio encargado de toda la comunicación HTTP con el módulo
 * de docentes en la API Laravel (DocenteController). Se inyecta
 * en registroDocente.component.ts para el flujo de crear/buscar/editar.
 */
@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  // URL base del endpoint de docentes, ej: http://localhost:8000/api/docentes
  private apiUrl = `${environment.apiUrl}/docentes`;

  constructor(private http: HttpClient) {}

  /**
   * CREATE — Registra un nuevo docente.
   * Llama a POST /api/docentes (DocenteController@store).
   * Se usa en guardarDocente() cuando rutEnEdicion es null,
   * es decir, cuando el formulario no proviene de una búsqueda previa.
   */
  registrarDocente(docente: Docente): Observable<any> {
    return this.http.post(this.apiUrl, docente)
      .pipe(catchError(this.manejarError));
  }

  /**
   * READ (listado) — Obtiene todos los docentes registrados.
   * Llama a GET /api/docentes (DocenteController@index).
   * No se usa actualmente en el componente, pero queda disponible
   * por si se implementa una tabla/listado de docentes más adelante.
   */
  listarDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.apiUrl)
      .pipe(catchError(this.manejarError));
  }

  /**
   * READ (por RUT) — Busca un docente específico.
   * Llama a GET /api/docentes/{rut} (DocenteController@show).
   * Se usa en buscarDocentePorRut(), disparado desde el modal
   * de búsqueda del formulario. Si encuentra el docente, sus datos
   * se cargan en el formulario y se activa el modo edición.
   */
  buscarPorRut(rut: string): Observable<Docente> {
    return this.http.get<Docente>(`${this.apiUrl}/${rut}`)
      .pipe(catchError(this.manejarError));
  }

  /**
   * UPDATE — Actualiza un docente existente.
   * Llama a PUT /api/docentes/{rut} (DocenteController@update).
   * Se usa en guardarDocente() cuando rutEnEdicion tiene un valor,
   * es decir, cuando el formulario fue precargado mediante
   * buscarDocentePorRut() y el usuario modificó algún dato.
   */
  actualizarDocente(rut: string, docente: Docente): Observable<any> {
    return this.http.put(`${this.apiUrl}/${rut}`, docente)
      .pipe(catchError(this.manejarError));
  }

  /**
   * Manejador de errores común para todas las peticiones del servicio.
   * Solo loguea el error en consola y lo re-lanza para que el
   * componente que llamó (registroDocente.component.ts) pueda
   * capturarlo en su propio bloque `error:` del subscribe()
   * y mostrar el mensaje correspondiente al usuario.
   */
  private manejarError(error: HttpErrorResponse) {
    console.error('Error desde API:', error);
    return throwError(() => error);
  }
}