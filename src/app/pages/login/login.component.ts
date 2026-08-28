// src/app/pages/login/login.component.ts

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class SignIn {
  usuario = '';
  password = '';

  cargando = false;
  mensajeError = '';

  private readonly USUARIO_VALIDO = 'admin';
  private readonly PASSWORD_VALIDA = 'admin';

  constructor(private router: Router) {}

  iniciarSesion(): void {
    this.mensajeError = '';

    if (!this.usuario || !this.password) {
      this.mensajeError = 'Ingrese usuario y contraseña.';
      return;
    }

    this.cargando = true;

    setTimeout(() => {
      this.cargando = false;

      if (this.usuario === this.USUARIO_VALIDO && this.password === this.PASSWORD_VALIDA) {
        this.router.navigate(['/registroDocente']);
      } else {
        this.mensajeError = 'Usuario o contraseña incorrectos.';
      }
    }, 500);
  }
}