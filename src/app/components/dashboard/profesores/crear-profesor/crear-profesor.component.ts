import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profesor } from '../../../../interface/profesor';
import { PeticionesService } from '../../../../services/peticiones.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-profesor',
  templateUrl: './crear-profesor.component.html',
  styleUrls: ['./crear-profesor.component.scss']
})
export class CrearProfesorComponent implements OnInit {

  public monedas: any;
  public arrayMonedas: string[] = [];
  public MonedasFiltradas: any;
  public hoy = new Date();

  tiposProfesor: any[] = [ 
    {value: '1', viewValue: 'Planta'},
    {value: '2', viewValue: 'Invitado'},
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder, 
              private $peticionService : PeticionesService,
              private router: Router,
              private snackBar: MatSnackBar) { 

    this.form = this.fb.group({
      Identificacion : ['', Validators.required], 
      Nombre : ['', Validators.required], 
      TipoProfesor : ['', Validators.required], 
      MonedaDePago : ['', Validators.required], 
      TarifaHoraria : ['', Validators.required], 
      FechaNacimiento : [''], 
    })

  }

  ngOnInit(): void {
    this.getApiMonedas();
    this.form.get('MonedaDePago')?.valueChanges.subscribe(res=>{
      this.filtrarMoneda(res);
    })
  }

  registrarProfesor(): void{

    if(this.form.invalid){
      this.snackBar.open('LOS CAMPOS EN ROJOS DEBEN SER COMPLETADOS!!!','',{
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
      return;
    }

    const profesor: Profesor = {
      identificacion: this.form.value.Identificacion,
      nombre: this.form.value.Nombre,
      tipoProfesor: this.form.value.TipoProfesor,
      monedaDePago: this.form.value.MonedaDePago,
      tarifaHoraria: this.form.value.TarifaHoraria,
      fechaNacimiento: this.form.value.FechaNacimiento == "" ? null : this.form.value.FechaNacimiento,
    }

    this.$peticionService.agregarProfesor(profesor)
    .subscribe({

      next: (res: any) => {
        this.snackBar.open(res.message,'',{
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
        this.router.navigate(['/dashboard/profesores'])
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
    this.router.navigate(['/dashboard/profesores'])
  }

  getApiMonedas(): void{
    this.$peticionService.getMonedas()
      .subscribe((res:any) =>{
        this.monedas = res.rates;
        for(const property in this.monedas){
          this.arrayMonedas.push(property);
        }
        this.MonedasFiltradas = this.arrayMonedas;
      })
  }

  filtrarMoneda(moneda: any){
    this.MonedasFiltradas = this.arrayMonedas.filter(item => {
      return item.toLowerCase().indexOf(moneda.toLowerCase()) > -1
    })
  }
}
