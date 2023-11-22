import { Component } from '@angular/core';
import { Publicacion } from '../models/publicacion';
import { CrudPublicacionService } from '../publicar/services/crud-publicacion.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  coleccionPublicaciones : Publicacion[] = [];

  constructor(public servicioCrud : CrudPublicacionService) {}

  ngOnInit() :void {
    this.servicioCrud.obtenerPublicacion().subscribe(publicacion => {
      this.coleccionPublicaciones = publicacion;
    }) 
  }

}
