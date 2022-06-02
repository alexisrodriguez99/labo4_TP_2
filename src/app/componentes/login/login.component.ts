import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mail:string="";
  contrasenia:string="";
  ajam:any;
  error:any;
  constructor(private authSvc:AuthService, private router:Router,private fs:FirestoreService) { }

  ngOnInit(): void {
  }
  async onLogin(email:any,password:any){

     
    try{
      let user:any;
      let traer:any;
      let hola:any;
      user= await this.authSvc.login(email.value, password.value);
      this.error=user;
      console.log(" _____"+user.user.emailVerified);
      console.log("::::::::::::");
      console.log(user.user.email);

if(user.user.email=="admin@gmail.com"){
  this.router.navigateByUrl('/home');

}
//alert(user);
  if(typeof(user)=='string'){
  console.log("sdfsfafs")
        Swal.fire({title: 'Error',text: user,icon: 'error'});
        }
     this.fs.obtenerById("usuariosClinica",user.user.uid).toPromise().then(async(ingreso)=>{
     /* this.authSvc.usuarioIngresado="";
      this.ajam=null;*/
      //alert(this.ajam)
      //alert("ddsf")
        //console.log(ingreso.payload.data());
        

        
 
      
   if(user ){this.ajam=ingreso?.data();
        console.log(this.ajam);
      this.authSvc.usuarioIngresado=this.ajam;
      console.log(this.authSvc.usuarioIngresado.nombre);
       console.log(this.authSvc.usuarioIngresado)
    // alert(this.ajam.perfil)
      if(this.ajam.perfil=="paciente"  && user.user.emailVerified)
      {
        console.log("soy un paciente");
        let f = new Date();
        this.fs.crear('logs',{ mensaje:'El usuario '+email.value+' ha inicado sesion el dia '+f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear() + ' a las ' + f.getHours()+':'+f.getMinutes()+':'+f.getSeconds()});
       console.log("Entro");
      this.router.navigateByUrl('/home');
      }
      else if(this.ajam.perfil=="paciente"  && !user.user.emailVerified){
        Swal.fire({
          title:'¡Error!',
          text:'¡El email que se uso para iniciar sesión no está verificado!',
          icon:'error',
          confirmButtonText:'Cerrar'
        });
        await this.authSvc.logout();
      }
      else if(this.ajam.perfil=="especialista" && this.ajam.permiso==true){
let f = new Date();
       this.fs.crear('logs',{ mensaje:'El usuario '+email.value+' ha inicado sesion el dia '+f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear() + ' a las ' + f.getHours()+':'+f.getMinutes()+':'+f.getSeconds()});
      console.log("Entro");
     this.router.navigateByUrl('/home');
      }
      else if(this.ajam.perfil=="especialista" && this.ajam.permiso==false)
      {
        Swal.fire({
          title:'¡Error!',
          text:'¡El usuario no fue aprobado por el administrador!',
          icon:'error',
          confirmButtonText:'Cerrar'
        });
        await this.authSvc.logout();
      }
      
    }
    else{
      console.log("no entro owo");
    }
      });
      
       
      
      //let hola=user.user.email;
    
    }
    catch(error:any){
      console.log('Error->',error);
         console.log("sdfsfafs")
              Swal.fire({title: 'Error',text: this.error,icon: 'error'});
              
      
    }
    
  }
  userAdmin(){
    this.mail="admin@gmail.com";
    this.contrasenia="123456";
  }
 unJugador(){
  this.mail="jamite8226@about27.com";
  this.contrasenia="111111";
 }
}
