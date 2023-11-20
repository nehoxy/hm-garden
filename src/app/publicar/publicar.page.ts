import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../models/publicacion';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudPublicacionService } from './services/crud-publicacion.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
})
export class PublicarPage implements OnInit {
  postTitle: string = '';
  postContent: string = '';
  userId!:any
  coleccionPublicaciones: Publicacion[] = [];

  publicacionForm = new FormGroup ({
    titulo: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    imagen: new FormControl('',Validators.required),
    
})

  constructor(public crudPublicacion:CrudPublicacionService, public authService:AuthService ) { }

  ngOnInit() {
    this.userId = this.authService.getUid()
  }

  async crearPublicacion(){
    if (this.publicacionForm.valid){
      const date = new Date();
      const hour = date.getHours();
      const min = date.getMinutes();
        let nuevaPublicacion:Publicacion = {
            idPublicacion: '',
            titulo: this.publicacionForm.value.titulo!,
            descripcion: this.publicacionForm.value.descripcion!,
            imagen: this.publicacionForm.value.imagen!,
            date_hour: {date,hour,min}
            
        }

        await this.crudPublicacion.crearPublicacion(nuevaPublicacion).
        then(publicacion => 
            {
              alert('producto agregado con exito')
              })
              .catch(error => {
                alert("Hubo un error al cargar el nuevo producto:( \n"+error);
              })
            }else{
                alert('error') 
            }
    }
  savePost() {}
}
