import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FirestoreService } from '../shared/services/firestore.service';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
import { FormControl,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  hide = true;
  hidePass = true;

  formLogin = this.fb.group({
    email: new FormControl ('',[Validators.required, Validators.email]),
    contrasena: new FormControl('',[Validators.required, Validators.minLength(8)])
  })

  usuarios: Usuario = {
    uid:'',
    nombre:'',
    apellido:'',
    email:'',
    contrasena:'' }

  constructor(public servicioAuth:AuthService, public firestore:FirestoreService, public router:Router, public fb:FormBuilder) { }

  ngOnInit() {
  }

  async iniciarSesion(){
    const credenciales = {
      email:this.usuarios.email,
      contrasena:this.usuarios.contrasena
    }
    const res = await this.servicioAuth.iniciarSesion(credenciales.email,credenciales.contrasena)
    .then( res =>{
      console.log('Te logeaste con exito')
      this.router.navigate(['home'])
    }).catch(error =>{
      console.log(error)
    })
  }
}
