import { Component, OnInit,OnChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import { UsuariosClinica } from '../../clases/usuariosClinica';
import { Router } from '@angular/router';
import { AltaRoutingModule } from '../alta/alta-routing.module';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnChanges {
  logedUser:any = null;
 public usuarioActual:any=this.authServise.usuarioIngresado
 rojo='red';
 verde='green';
 rosa='pink';
 azul='blue';
 amarillo='yellow';
  constructor(private authServise: AuthService,private router: Router,private users:UsersService) { }
  ngOnInit(): void {
    this.estaLogeado();
    /*this.authServise.afAuth.user.subscribe(()=>{
      if(!this.user)
      {
        setTimeout(()=>{
          this.user = this.authSvc.currentUser;
          console.log('se cambia el usuario', this.user);
        }, 1500);
      }
      else
      {
        this.user = null;
      }
    });*/
   }
  ngOnChanges()
  { 
       console.log("________________");

       console.log(this.authServise.usuarioIngresado);
       console.log("_______");
   }
  logOut()
  {
    this.authServise.usuarioIngresado="";
    console.log(this.authServise.usuarioIngresado)
    this.authServise.logout();
    console.log("saliendo");
    this.router.navigateByUrl('/home');

  }
estaLogeado(){
  this.authServise.isAuth().subscribe(auth =>{
    if(auth){
      console.log(auth.uid);
      console.log(auth.displayName);
      console.log(auth.email);
      console.log("testeo")
    //  console.log(this.authServise.usuarioIngresado)
      this.logedUser=true;
      setTimeout(()=>{
        this.usuarioActual = this.authServise.usuarioIngresado;
        console.log('se cambia el usuario', this.usuarioActual);
 
      }, 1500);
    }
    else
    {
      this.logedUser=false;
    }
  })
}

}
