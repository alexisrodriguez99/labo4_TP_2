import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FirestoreService } from 'src/app/componentes/services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss']
})
export class EspecialidadesComponent implements OnInit {
  @Output() unaEspecialidad:EventEmitter<any>=new EventEmitter<any>();
  especialidadSelecionada:string="";
  listadoPaises:any;
  especialidadAgregada:any=""
  constructor(private fire:FirestoreService, private afs:AngularFirestore,private router: Router ) { }

  ngOnInit(): void {
     this.traerTodasEspecialidades()
  }
  traerTodasEspecialidades(){
    //this.paises.traerTodosPaises();
    //No funca :(
    /*this.listadoPaises=this.paises.traerTodosPaises();
    console.log("listado de paises: "+this.listadoPaises);*/
    this.fire.obtenerTodos('especialidades').subscribe((repatidor)=>{
      this.listadoPaises=[];
      repatidor.forEach((unRepartidor:any)=>{
//if(unRepartidor.estado=="listo sin entregar")



this.listadoPaises.push(unRepartidor.payload.doc.data());
     console.log(unRepartidor.payload.doc.data());
      });
     
    }
    
    )
  }
  selecionarEspecialidad(pais:any){
    this.unaEspecialidad.emit(pais);
   console.log(pais);
  }
  agregar(){
    let id;
     id=this.afs.createId();

    this.fire.actualizar('especialidades',id,{nombre:this.especialidadAgregada}).then(()=>{
      this.especialidadAgregada="";
      // this.route.navigate(['bienvenido']);
     });
  }
  pacientes(){
    this.router.navigateByUrl('/listaEspecialista');
  }
}
