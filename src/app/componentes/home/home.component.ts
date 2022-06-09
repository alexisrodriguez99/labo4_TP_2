import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isAdmin } from '@firebase/util';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public usuarioActual:any=this.authServise.usuarioIngresado

  constructor(public authServise: AuthService,private router:Router) { }

  logedUser:any = false;
  mail:any=null;
  ngOnInit(): void {
    this.estaLogeado();
    console.log("_______")
   // console.log(this.authServise.usuarioIngresado)
     if(this.logedUser==false && this.authServise.usuarioIngresado.perfil=="admin"){
      this.onLogin("admin@gmail.com","123456")
    }
    //alert(this.authServise.usuarioIngresado.nombre)
  }
  /*logOut()
  {
    this.authServise.logout();
    console.log("saliendo");
  }*/
estaLogeado(){
  this.authServise.isAuth().subscribe(auth =>{
    if(auth){
      /*console.log(auth.uid);
      console.log(auth.displayName);
      console.log(auth.email);*/
      
         this.logedUser=true;
      this.mail=auth.email;
     
     
    }
    else
    {
      this.logedUser=false;
    }
  })
}
async onLogin(email:any,password:any){

     

    let user:any;
    let traer:any;
    let hola:any;
    user= await this.authServise.login(email, password);
     console.log(" _____"+user.user.emailVerified);
    console.log("::::::::::::");
    console.log(user.user.email);
  }
  miPerfil(){
    this.router.navigateByUrl('/miPerfil');

  }
  sacarTurno(){
    this.router.navigateByUrl('/solicitarTurno');

  }
  turnos(){
    this.router.navigateByUrl('/turnos');

  }
  misTurnos(perfil:any){
    this.router.navigateByUrl('/misTurnos');

  }
}
