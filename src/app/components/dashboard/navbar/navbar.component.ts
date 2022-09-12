import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interface/menu';
import {  PeticionesService } from 'src/app/services/peticiones.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = []

  constructor(private $peticionesService: PeticionesService) { }

  ngOnInit(): void {
    this.cargarMenu();
  }

  cargarMenu(): void{
    this.$peticionesService.getMenu().subscribe(data =>{
      this.menu = data;
    })
  }

}
