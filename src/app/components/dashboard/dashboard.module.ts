import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { LeccionesComponent } from './lecciones/lecciones.component';
import { NominaComponent } from './nomina/nomina.component';
import { CrearProfesorComponent } from './profesores/crear-profesor/crear-profesor.component';
import { CrearLeccionComponent } from './lecciones/crear-leccion/crear-leccion.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    ProfesoresComponent,
    LeccionesComponent,
    NominaComponent,
    CrearProfesorComponent,
    CrearLeccionComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
