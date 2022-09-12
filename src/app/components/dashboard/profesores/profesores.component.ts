import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { Profesor } from '../../../interface/profesor';


@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})
export class ProfesoresComponent implements OnInit {

  listProfesor: Profesor[] = []

  displayedColumns: string[] = ['id', 'nombre', 'tipoProfesor', 'monedaPago', 'tarifaHora', 'fechaNacimiento', 'acciones'];
  dataSource!: MatTableDataSource<any> 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private $peticionesService : PeticionesService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarProfesores();
  }

  cargarProfesores(){
    this.$peticionesService.getProfesores().subscribe(res =>{
      this.listProfesor = res;
      this.listProfesor = this.mapProfesores(this.listProfesor)
      this.dataSource = new MatTableDataSource(this.listProfesor)
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  buscarProfesor(id: any) {

    if(id.length === 0){
      this.cargarProfesores();
      return;
    }

    this.listProfesor = [];
    this.dataSource = new MatTableDataSource(this.listProfesor)

    this.$peticionesService.getProfesorById(id)
      .subscribe(
        res =>{
          if(res == null){
            return;
          }
          this.listProfesor.push(res);
          this.listProfesor = this.mapProfesores(this.listProfesor)
          this.dataSource = new MatTableDataSource(this.listProfesor)
        });
  }

  eliminarProfesor(id: string){

    this.$peticionesService.eliminarProfesor(id)
      .subscribe({

        next: (res: any) => {
          this.snackBar.open(res.message,'',{
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })
          this.cargarProfesores();
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

  mapProfesores(profesores: Profesor[]): Profesor[]{
    
      profesores.forEach(profesor => {
              if(profesor.tipoProfesor === '1'){
                profesor.tipoProfesor = 'Planta'
              }else{
                profesor.tipoProfesor = 'Invitado'
              }
              profesor.fechaNacimientoMap = profesor.fechaNacimiento != null ? 
                                            this.formatDate(profesor.fechaNacimiento) : 
                                            profesor.fechaNacimiento
                                            
              profesor.tarifaHoraria = this.formatMoneda(profesor.tarifaHoraria);
            });

      return profesores;
  }

}
