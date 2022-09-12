import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { LeccionesComponent } from './lecciones/lecciones.component';
import { NominaComponent } from './nomina/nomina.component';
import { CrearProfesorComponent } from './profesores/crear-profesor/crear-profesor.component';
import { CrearLeccionComponent } from './lecciones/crear-leccion/crear-leccion.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', component: InicioComponent},
    { path: 'profesores', component: ProfesoresComponent},
    { path: 'lecciones', component: LeccionesComponent},
    { path: 'nomina', component: NominaComponent},
    { path: 'crear-profesor', component: CrearProfesorComponent},
    { path: 'crear-leccion', component: CrearLeccionComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
