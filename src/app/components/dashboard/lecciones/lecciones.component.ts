import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { Leccion } from '../../../interface/leccion';

@Component({
  selector: 'app-lecciones',
  templateUrl: './lecciones.component.html',
  styleUrls: ['./lecciones.component.scss']
})
export class LeccionesComponent implements OnInit {

  listLeccion: Leccion[] = []

  displayedColumns: string[] = ['idProfesor', 'nombreProfesor', 'codigo', 'curso', 'horasDictadas', 'valorLeccion', 'fecha','acciones'];
  dataSource!: MatTableDataSource<any> 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private $peticionesService : PeticionesService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarLecciones();
  }

  cargarLecciones(){
    this.$peticionesService.getLecciones().subscribe(res =>{
      this.listLeccion = res;
      this.listLeccion = this.mapLecciones(this.listLeccion)
      this.dataSource = new MatTableDataSource(this.listLeccion)
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  buscarLeccion(codigo: any) {

    if(codigo.length === 0){
      this.cargarLecciones();
      return;
    }

    this.listLeccion = [];
    this.dataSource = new MatTableDataSource(this.listLeccion)

    this.$peticionesService.getLeccionById(codigo)
      .subscribe(
        res =>{
          if(res == null){
            return;
          }
          this.listLeccion.push(res);
          this.listLeccion = this.mapLecciones(this.listLeccion)
          this.dataSource = new MatTableDataSource(this.listLeccion)
        });
  }

  eliminarLeccion(codigo: string){

    this.$peticionesService.eliminarLeccion(codigo)
      .subscribe({

        next: (res: any) => {
          this.snackBar.open(res.message,'',{
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })
          this.cargarLecciones();
        },

        error: (err: any) => {
          this.snackBar.open(err.error,'',{
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })
        }
    });

  }

  formatDate(date: any){
    date = new Date(date)
    if(date != null){
      let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
      return formatted_date;
    }else{
      return date;
    }
  }

  formatMoneda(valor: number){
    const formatterPeso = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    })
    return formatterPeso.format(valor)
  }

  mapLecciones(lecciones: Leccion[]): Leccion[]{
    
        lecciones.forEach(leccion => {
              leccion.fecha = leccion.fecha != null ? 
                              this.formatDate(leccion.fecha) : 
                              leccion.fecha
                                            
              leccion.valorLeccion = this.formatMoneda(leccion.valorLeccion);
            });

      return lecciones;
  }
}
