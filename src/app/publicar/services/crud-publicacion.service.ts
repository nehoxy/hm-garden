import { Injectable } from '@angular/core';
import { Publicacion } from 'src/app/models/publicacion';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudPublicacionService {
  private publicacionesColeccion: AngularFirestoreCollection<Publicacion>

  constructor(private database:AngularFirestore, private fireAuth:AngularFireAuth) { 
    this.publicacionesColeccion = database.collection('publicaciones')
   
  }
  private async obtenerUsuarioId(): Promise<string | null> {
    try {
      const user = await this.fireAuth.currentUser;

      if (user === null) {
        return null;
      } else {
        return user.uid;
      }
    } catch (error) {
      console.error('Error al obtener UID:', error);
      return null;
    }
  }

  async crearPublicacion(publicacion: Publicacion) {
    try {
      const usuarioId = await this.obtenerUsuarioId();

      if (!usuarioId) {
        throw new Error('Usuario no autenticado');
      }

      // Asigna el usuarioId como parte de la ruta de la colección
      const rutaColeccion = `usuarios/${usuarioId}/publicaciones`;

      // Genera un ID único para la nueva publicación
      const id = this.database.createId();
      publicacion.idPublicacion = id;
      // 
      const publicacionConUsuarioId = { ...publicacion, usuarioId }
      // Agrega la publicación a la colección del usuario
      const resultado = await this.database.collection(rutaColeccion).doc(id).set(publicacion);

      //agrego la publicacion a la coleccion de todas las publicaciones
      const resultado2 = await this.publicacionesColeccion.doc(id).set(publicacionConUsuarioId)

      return {resultado, resultado2};
    } catch (error) {
      throw error;
    }
  }
}
