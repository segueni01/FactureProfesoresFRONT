import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../interface/menu';
import { Profesor } from '../interface/profesor';
import { environment } from '../../environments/environment';
import { Leccion } from '../interface/leccion';
import { Nomina } from '../interface/nomina';
import { NominaRequest } from '../interface/nominaRequest';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  private apiUrl: string;
  private apiUrlMonedas: string;

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.UrlApiProfesores;
    this.apiUrlMonedas = environment.UrlApiMonedas;
  }

  getMenu(): Observable<Menu[]>{
    return this.http.get<Menu[]>('./assets/data/menu.json');
  }

//#region API PROFESORES
  getProfesores(): Observable<Profesor[]>{
    const url = `${this.apiUrl}api/Profesor/GetProfesores`;
    return this.http.get<Profesor[]>(url);
  }

  getProfesorById(id: string): Observable<Profesor>{
    const url = `${this.apiUrl}api/Profesor/GetProfesorById/${id}`;
    return this.http.get<Profesor>(url);
  }

  eliminarProfesor(id: string): Observable<any>{
    const url = `${this.apiUrl}api/Profesor/DeleteProfesor/${id}`;
    return this.http.delete(url);
  }

  agregarProfesor({identificacion, nombre, tipoProfesor, monedaDePago, tarifaHoraria, fechaNacimiento}: Profesor) : Observable<any>{
    const url = `${this.apiUrl}api/Profesor/PostProfesor`;
    return this.http.post(url, {
      identificacion, 
      nombre, 
      tipoProfesor, 
      monedaDePago, 
      tarifaHoraria, 
      fechaNacimiento
    });
  }
//#endregion API PROFESORES


//#region API LECCIONES
getLecciones(): Observable<Leccion[]>{
  const url = `${this.apiUrl}api/Leccion/GetLecciones`;
  return this.http.get<Leccion[]>(url);
}

getLeccionById(codigo: string): Observable<Leccion>{
  const url = `${this.apiUrl}api/Leccion/GetLecionById/${codigo}`;
  return this.http.get<Leccion>(url);
}

eliminarLeccion(codigo: string): Observable<any>{
  const url = `${this.apiUrl}api/Leccion/DeleteLeccion/${codigo}`;
  return this.http.delete(url);
}

agregarLeccion({idProfesor, codigo, curso, horasDictadas,fecha}: Leccion): Observable<any>{
  const url = `${this.apiUrl}api/Leccion/PostLeccion`;
  return this.http.post(url, {
    idProfesor,
    codigo,
    curso,
    horasDictadas,
    fecha
  });
}
//#endregion API LECCIONES

//#region API NOMINA
getNomina(consulta: NominaRequest): Observable<Nomina[]>{
  const url = `${this.apiUrl}api/Nomina/GetNomina`;
  return this.http.post<Nomina[]>(url, consulta);
}

//#endregion API NOMINA

  getMonedas(){
    const url = `${this.apiUrlMonedas}v6/latest/COP`;
    return this.http.get(url);
  }
}
