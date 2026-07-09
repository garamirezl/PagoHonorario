// src/app/services/docente.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Docente } from '../models/docente.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private apiUrl = `${environment.apiUrl}/docentes`;

  constructor(private http: HttpClient) {}

  registrarDocente(docente: Docente): Observable<any> {
    return this.http.post(this.apiUrl, docente)
      .pipe(
        catchError(this.manejarError)
      );
  }

  listarDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.apiUrl)
      .pipe(
        catchError(this.manejarError)
      );
  }

  buscarPorRut(rut: string): Observable<Docente> {
    return this.http.get<Docente>(`${this.apiUrl}/${rut}`)
      .pipe(
        catchError(this.manejarError)
      );
  }

  private manejarError(error: HttpErrorResponse) {
    console.error('Error desde API:', error);
    return throwError(() => error);
  }
}