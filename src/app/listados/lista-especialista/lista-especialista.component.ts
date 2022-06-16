import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FirestoreService } from 'src/app/componentes/services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-especialista',
  templateUrl: './lista-especialista.component.html',
  styleUrls: ['./lista-especialista.component.scss']
})
export class ListaEspecialistaComponent implements OnInit {

  listaEspecialista:any;
  constructor(private fire:FirestoreService, private afs:AngularFirestore,private router: Router ) { }

  ngOnInit(): void {
    this.traerTodasEspecialidades()
 }
 traerTodasEspecialidades(){
   //this.paises.traerTodosPaises();
   //No funca :(
   /*this.listadoPaises=this.paises.traerTodosPaises();
   console.log("listado de paises: "+this.listadoPaises);*/
   this.fire.obtenerTodos('usuariosClinica').subscribe((repatidor)=>{
           this.listaEspecialista=[];

    repatidor.forEach((unRepartidor:any)=>{
      let estado=unRepartidor.payload.doc.data();
      if(estado.perfil=="especialista")
 //if(unRepartidor.estado=="listo sin entregar")



this.listaEspecialista.push(unRepartidor.payload.doc.data());
     });
    
   }
   
   )
 }
 aceptar(especialista:any){
  especialista.permiso=true;
  this.fire.actualizar('usuariosClinica',especialista.id,especialista).then(()=>{
    // this.route.navigate(['bienvenido']);
   });
 }
 rechazar(especialista:any){
  especialista.permiso=false;
  this.fire.actualizar('usuariosClinica',especialista.id,especialista).then(()=>{
    // this.route.navigate(['bienvenido']);
   });
 }
 pacientes(){
  this.router.navigateByUrl('/pacientes');
}
}
