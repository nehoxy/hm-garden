import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Usuario } from '../models/usuario';
import { Validators,FormBuilder,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from '../shared/services/firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  hide = true;
  hidePass = true;
  error:boolean = false;
  errorMensaje:string = ''
  repetirContrasena:any = ''
  
  formRegistro = this.fb.group({
    nombre: new FormControl ('',[Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('',[Validators.required, Validators.minLength(4)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    contrasena: new FormControl('',[Validators.required, Validators.minLength(8)]),
    repetirContrasena: new FormControl('',[Validators.required, Validators.minLength(8)])
  })
  usuarios:Usuario = {
    uid:'',
    nombre:'',
    apellido: '',
    email:'',
    contrasena:'',
  }
  uid = ''

  coleccionUsuarios : Usuario[] = [];

  constructor(public servicioAuth:AuthService, public servicioFirestore:FirestoreService, public router:Router, public fb:FormBuilder) { }

  async registrarse() {
    const credenciales = {
      nombre: this.usuarios.nombre,
      apellido:this.usuarios.apellido,
      email: this.usuarios.email,
      contrasena: this.usuarios.contrasena
    };

    const res = await this.servicioAuth.registrar(credenciales.nombre, credenciales.apellido, credenciales.email, credenciales.contrasena)
    .then(res =>{
      alert("Ha agregado un nuevo usuario con éxito :)");

      this.router.navigate(['/inicio']);
    })
    .catch(error => 
      alert("Hubo un error al cargar el usuario :( \n"+error)
    );

    const uid = await this.servicioAuth.getUid();

    this.usuarios.uid = uid;

    this.guardarUser();
  }

  async guardarUser(){
    this.servicioFirestore.agregarUsuario(this.usuarios, this.usuarios.uid, this.usuarios.nombre, this.usuarios.apellido, this.usuarios.email, this.usuarios.contrasena).then(res=>{
      console.log(this.usuarios)
    })
    .catch(error => {
      console.log('Error =>',error)
    })
  }

  async ngOnInit(){
    const uid = await this.servicioAuth.getUid();
    console.log(uid);
  }

}
