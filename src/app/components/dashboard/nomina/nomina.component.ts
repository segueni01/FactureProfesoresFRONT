import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Nomina } from 'src/app/interface/nomina';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NominaRequest } from '../../../interface/nominaRequest';

@Component({
  selector: 'app-nomina',
  templateUrl: './nomina.component.html',
  styleUrls: ['./nomina.component.scss']
})
export class NominaComponent implements OnInit {

  public hoy = new Date()
  public listNomina: Nomina[] = []
  public displayedColumns: string[] = ['idProfesor', 'nombreProfesor', 'totalNominaCOP', 'totalLeccionesDictadas', 'diaInicialMes', 'diaFinalMes'];
  public dataSource!: MatTableDataSource<any> 

  public form: FormGroup;

  constructor(private fb: FormBuilder,
              private $peticionesService : PeticionesService, 
              private snackBar: MatSnackBar) {

      this.form = this.fb.group({
        Fecha : ['', Validators.required]
      })
  }

  ngOnInit(): void {
  }

  getNominaMes(){

    if(this.form.invalid){
      this.snackBar.open('LOS CAMPOS EN ROJOS DEBEN SER COMPLETADOS!!!','',{
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
      return;
    }

    const consulta: NominaRequest = {
      Fecha : this.form.value.Fecha
    }

    this.$peticionesService.getNomina(consulta)
      .subscribe({

        next: (res: any) => {
        this.listNomina = res;
        this.listNomina = this.mapNomina(this.listNomina);
        this.dataSource = new MatTableDataSource(this.listNomina)

        },

        error: (err) =>{
          this.snackBar.open('No puede consultar una fecha mayor al mes actual','',{
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })
        }
      })
  }

  mapNomina(nomina: Nomina[]): Nomina[]{

    nomina.forEach(nominaProfesor => {
      nominaProfesor.diaInicialMes = nominaProfesor.diaInicialMes != null ? 
                                    this.formatDate(nominaProfesor.diaInicialMes) : 
                                    nominaProfesor.diaInicialMes
      nominaProfesor.diaFinalMes = nominaProfesor.diaFinalMes != null ? 
                                    this.formatDate(nominaProfesor.diaFinalMes) : 
                                    nominaProfesor.diaFinalMes
                                    
                                    
      nominaProfesor.totalNominaCOP = this.formatMoneda(nominaProfesor.totalNominaCOP);
    });

    return nomina;
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

}
