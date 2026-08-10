/* import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('PagoHonorario');
} */

  // src/app/app.ts

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  AppLayoutComponent,
  NavSection,
  UserDropdownUser,
} from '@ubo/ui-shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppLayoutComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('PagoHonorario');

  readonly mockUser: UserDropdownUser = {
    nombre: 'María',
    apellido_paterno: 'González',
    email: 'maria.gonzalez@ubo.cl',
  };

  readonly navSections: NavSection[] = [
    {
      label: 'Menu',
      items: [
         {
          name: 'Registro Docente',
          icon:
            '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path d="M3 12L12 4l9 8M5 10v10h14V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
          path: '/registroDocente',
        },
        {
          name: 'Carga Académica',
          icon:
            '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path d="M3 12L12 4l9 8M5 10v10h14V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
          path: '/cargaAcademica',
        },
        {
          name: 'Carga de Boleta',
          icon:
            '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path d="M3 12L12 4l9 8M5 10v10h14V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
          path: '/cargaBoleta',
        },
        {
          name: 'Parametrización',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path d="M12 8v4l3 2M21 12a9 9 0 1 1-3.5-7.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
          subItems: [
            { name: 'Periodos', path: '/parametrizacionPeriodo' },
            { name: 'Grados', path: '/parametrizacionGrado' },
            { name: 'Pagos Adicionales', path: '/parametrizacionPagoAdicional' },
          ],
        },
      ],
    },
    {
      label: 'Administración',
      items: [
        {
          name: 'Usuarios',
          icon:
            '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M2 21c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="17" cy="8" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M22 19c0-2.761-2.239-5-5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
          path: '/admin/usuarios',
        },
        {
          name: 'Configuración',
          icon:
            '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
          path: '/admin/config',
        },
      ],
    },
  ];
}