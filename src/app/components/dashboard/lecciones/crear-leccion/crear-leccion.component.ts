import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profesor } from '../../../../interface/profesor';
import { PeticionesService } from '../../../../services/peticiones.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Leccion } from '../../../../interface/leccion';

@Component({
  selector: 'app-crear-leccion',
  templateUrl: './crear-leccion.component.html',
  styleUrls: ['./crear-leccion.component.scss']
})
export class CrearLeccionComponent implements OnInit {

  public arrayProfesores: string[] = []
  public profesoresFiltrados: any;

  form: FormGroup;

  constructor(private fb: FormBuilder, 
              private $peticionService : PeticionesService,
              private router: Router,
              private snackBar: MatSnackBar) { 

      this.form = this.fb.group({
        IdProfesor : ['', Validators.required], 
        Codigo : ['', Validators.required], 
        Curso : ['', Validators.required], 
        HorasDictadas : ['', Validators.required], 
        Fecha : ['', Validators.required]
      })

  }

  ngOnInit(): void {
    this.getProfesores();
    this.form.get('IdProfesor')?.valueChanges.subscribe(res=>{
      this.filtrarProfesores(res);
    })
  }

  registrarLeccion(): void{

    if(this.form.invalid){
      this.snackBar.open('LOS CAMPOS EN ROJOS DEBEN SER COMPLETADOS!!!','',{
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
      return;
    }

    const leccion: Leccion = {
        idProfesor: this.form.value.IdProfesor,
        codigo: this.form.value.Codigo,
        curso: this.form.value.Curso,
        horasDictadas: this.form.value.HorasDictadas,
        fecha: this.form.value.Fecha,
    }

    this.$peticionService.agregarLeccion(leccion)
    .subscribe({

      next: (res: any) => {
        this.snackBar.open(res.message,'',{
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
        this.router.navigate(['/dashboard/lecciones'])
      },
      
      error: (err) => {
        this.snackBar.open(err.error,'',{
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      }
    });

  }

  regresar(): void{
    this.router.navigate(['/dashboard/lecciones'])
  }

  getProfesores(): void{
    this.$peticionService.getProfesores()
      .subscribe((res: Profesor[]) => {
        res.forEach((profesor: Profesor) => {
          this.arrayProfesores.push(profesor.identificacion);
        });
        this.profesoresFiltrados = this.arrayProfesores;
      })
  }

  filtrarProfesores(profesor: any){
    this.profesoresFiltrados = this.arrayProfesores.filter(item => {
      return item.toLowerCase().indexOf(profesor.toLowerCase()) > -1
    })
  }

}
