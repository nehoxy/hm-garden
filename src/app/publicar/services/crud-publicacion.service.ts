import { Injectable } from '@angular/core';
import { Publicacion } from 'src/app/models/publicacion';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudPublicacionService {
  private publicacionesColeccion: AngularFirestoreCollection<Publicacion>

  constructor(private database:AngularFirestore) { 
    this.publicacionesColeccion = database.collection('publicaciones')
  }

  crearPublicacion(publicacion:Publicacion) {
    return new Promise(async(resolve,reject) =>{
      try{
        const id = this.database.createId();
        publicacion.idPublicacion = id;

        const resultado = await this.publicacionesColeccion.doc(id).set(publicacion);
        resolve(resultado);
      } catch(error){
        reject(error)
      }
    })
   }
}
