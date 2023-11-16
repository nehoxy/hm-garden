import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private usuariosCollection: AngularFirestoreCollection<Usuario>

  constructor(private database: AngularFirestore) {
    this.usuariosCollection = this.database.collection<Usuario>('usuarios')
  }

  agregarUsuario(usuario:Usuario, id:string, nombre:string, apellido:string, email:string, contrasena:string) {
    return new Promise(async (resolve, reject) => {
      try {
        usuario.uid = id;

        const resultado = await this.usuariosCollection.doc(id).set(usuario)
        resolve(resultado)
      }catch(error){
        reject(error)
      }
    })
  }
}
