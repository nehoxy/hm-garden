import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../models/publicacion';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudPublicacionService } from './services/crud-publicacion.service';
import { AuthService } from '../shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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
    imagen: new FormControl(null, Validators.required),
    
})

  constructor(public crudPublicacion:CrudPublicacionService, public authService:AuthService, public afs:AngularFirestore, private afStorage: AngularFireStorage ) { }

  ngOnInit() {
    this.userId = this.authService.getUid()
  }

  async crearPublicacion(){
    if (this.publicacionForm.valid) {
      try {
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();
  
        const imagenFile = this.publicacionForm.value.imagen as File | null | undefined;
        const id = this.afs.createId();

        if (imagenFile) {
          const imageUrl = await this.subirImagenAFS(`imagenes/${id}`, imagenFile);
  
          let nuevaPublicacion: Publicacion = {
            idPublicacion: '',
            titulo: this.publicacionForm.value.titulo!,
            descripcion: this.publicacionForm.value.descripcion!,
            imagen: imageUrl,
            date_hour: { date, hour, min },
            usuario: 'prueba'
          };
  
          await this.crudPublicacion.crearPublicacion(nuevaPublicacion);
  
          alert('Producto agregado con éxito');
        } else {
          alert('Error: No se ha seleccionado ninguna imagen');
        }
      } catch (error) {
        alert('Hubo un error al cargar el nuevo producto: \n' + error);
      }
    } else {
      alert('Error: formulario no válido');
    }
    }
  savePost() {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    // Mostrar la vista previa de la imagen seleccionada
    this.publicacionForm.patchValue({ imagen: file });
  }

  private async subirImagenAFS(path: string, file: File): Promise<string> {
    const ref = this.afStorage.ref(path);
    const task = ref.put(file);

  // Manejar el evento de completado de la tarea de subida
  return new Promise<string>((resolve, reject) => {
    task.then(snapshot => {
      // La tarea se completó con éxito
      ref.getDownloadURL().subscribe(downloadURL => {
        resolve(downloadURL);
      });
    }).catch(error => {
      // La tarea falló
      reject(error);
    });
  });
  }
}
