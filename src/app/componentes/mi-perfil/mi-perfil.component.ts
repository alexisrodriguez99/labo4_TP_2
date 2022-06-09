import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import Swal from 'sweetalert2';
import { Turno } from 'src/app/clases/turno';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {getFirestore, collection, query, where,onSnapshot,doc,addDoc } from "firebase/firestore";
import { map } from 'rxjs';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {
  logedUser:any
  usuario:any = this.authSer.usuarioIngresado;
 
  public grupoDeControles!:FormGroup
  diasLaborables:any = [];
  referencia:any;

  turno:Turno={id:'',idPaciente:'',idEspecialista:'',especialidad:'',dia:0,diaString:'',mes:'',hora:'',estado:'',duracion:0,fechaCreacion:0,resenia:false,comentarioPaciente:'',
  comentarioEspecialista:'',comentarioAdmin:'',diagnostico:'',tieneCalificacion:false,calificacion:0,encuestaRealizada:false}
  diasAMostrar:any[] = [];
  constructor(private fb:FormBuilder,private firestore:FirestoreService,private router:Router,private authSer:AuthService,private afs: AngularFirestore) {
 
  }

  ngOnInit(): void {
    this.grupoDeControles=this.fb.group({
      'horario':['',[Validators.required]],
      'especialidad':['',[Validators.required]],
      'lunes':[false],
      'martes':[false],
      'miercoles':[false],
      'jueves':[false],
      'viernes':[false],
      'sabado':[false],  
       
  
    });
  }
enviar(){
  let uwu=this.grupoDeControles.get('lunes')?.value;
  this.usuario.diasLaborables.lunes = this.grupoDeControles.get('lunes')?.value;
  this.usuario.diasLaborables.martes = this.grupoDeControles.get('martes')?.value;
  this.usuario.diasLaborables.miercoles = this.grupoDeControles.get('miercoles')?.value;
  this.usuario.diasLaborables.jueves = this.grupoDeControles.get('jueves')?.value;
  this.usuario.diasLaborables.viernes = this.grupoDeControles.get('viernes')?.value;

  let horario = this.grupoDeControles.get('horario')?.value;

    if(horario == 'maniana'){
    this.usuario.horario = {empieza:'8:00', termina:'13:00'};
  }
  else{
    this.usuario.horario = {empieza:'14:00', termina:'19:00'};
  }
  this.firestore.actualizar('usuariosClinica', this.usuario.id, this.usuario).then(()=>{
     Swal.fire({
      title:'¡Bien!',
      text:'¡Horarios asignados correctamente!',
      icon:'success',
      cancelButtonText:'Cerrar',
    });
  });
}
async crearTurnos(){
 // alert(this.grupoDeControles.get('especialidad')?.value)
 this.diasLaborables=[];
 this.diasAMostrar=[];
  console.log(this.usuario);
  let diaActual = new Date().getTime();

  if(this.usuario.diasLaborables.lunes)
  {
    this.diasLaborables.push('Lunes');
  }
  if(this.usuario.diasLaborables.martes)
  {
    this.diasLaborables.push('Martes');
  }if(this.usuario.diasLaborables.miercoles)
  {
    this.diasLaborables.push('Miercoles');
  }if(this.usuario.diasLaborables.jueves)
  {
    this.diasLaborables.push('Jueves');
  }if(this.usuario.diasLaborables.viernes)
  {
    this.diasLaborables.push('Viernes');
  }if(this.usuario.diasLaborables.sabado)
  {
    this.diasLaborables.push('Sabado');
  }
console.log(this.diasLaborables)
  for(let i = 1; i <= 15; i++)
  {
    this.diasAMostrar.push(new Date(diaActual+(86400000*i)));
  }
  this.diasAMostrar.forEach(dias => {
    let diaParceado=this.casteoFecha(dias,"dia");
    let repetido=true
    if(this.diasLaborables.includes(diaParceado)){
     // console.log(dias.getDate() )
     this.firestore.obtenerTodosFijo("turno").toPromise().then(async(repatidor)=>{
       let estado
      repatidor?.forEach((unRepartidor:any)=>{
        //if(unRepartidor.estado=="listo sin entregar")
        estado=unRepartidor.data();
        if(estado.dia==dias.getDate() && estado.mes==this.casteoFecha(dias,"mes") && estado.especialidad==this.grupoDeControles.get('especialidad')?.value){
          repetido=false;
           
          //console.log(estado)


          
        } 
        });
        if( this.grupoDeControles.get('horario')?.value=="maniana"      ){
          //alert(repetido)
                  if(repetido){
                    repetido=true;
                      let horarios =['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00'];
                      horarios.forEach(hora => {
                        console.log(hora)
                        this.turno.fechaCreacion=dias.getTime();
                        this.turno.hora=hora;
                        this.turno.estado='libre';
                        this.turno.dia=dias.getDate();
                        this.turno.mes=this.casteoFecha(dias,"mes");
                        this.turno.duracion=30;
                        this.turno.idEspecialista=this.usuario.id;
                        this.turno.id=this.afs.createId();
                        this.turno.diaString=this.casteoFecha(dias,"dia");
                      this.turno.especialidad=this.grupoDeControles.get('especialidad')?.value;
                      this.firestore.actualizar('turno',this.turno.id,this.turno).then(()=>{
                        //this.route.navigate(['bienvenido']);
                      })
                    
                  });
                }
          
          //TURNO TARDE
                }else{
                  if(repetido){
                    repetido=true;
                      let horarios =  ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30','19:00'];
                      horarios.forEach(hora => {
                        console.log(hora)
                        this.turno.fechaCreacion=dias.getTime();
                        this.turno.hora=hora;
                        this.turno.estado='libre';
                        this.turno.dia=dias.getDate();
                        this.turno.mes=this.casteoFecha(dias,"mes");
                        this.turno.duracion=30;
                        this.turno.idEspecialista=this.usuario.id;
                        this.turno.id=this.afs.createId();
                        this.turno.diaString=this.casteoFecha(dias,"dia");
                      this.turno.especialidad=this.grupoDeControles.get('especialidad')?.value;
                      this.firestore.actualizar('turno',this.turno.id,this.turno).then(()=>{
                        //this.route.navigate(['bienvenido']);
                      })
                    
                  });
                }
                }
     
    })
     
     
    }
    
  });

}
casteoFecha(value:any,args:any){
  let retorno :any= '';
//console.log(value.getDay()+":::")
  switch(args)
      {
        case 'dia':
          switch(value.getDay())
          {
            case 1:
              retorno+='Lunes';
              break;
            case 2:
              retorno+='Martes';
              break;
            case 3:
              retorno+='Miercoles';
              break;
            case 4:
              retorno+='Jueves';
              break;
            case 5:
              retorno+='Viernes';
              break;
            case 6:
              retorno+='Sabado';
              break;
          }
          break;
        case 'fecha':
          retorno = value.getDate();
          break;
        case 'mes':
          switch(value.getMonth()+1)
          {
            case 1:
              retorno+='Enero';
              break;
            case 2:
              retorno+='Febrero';
              break;
            case 3:
              retorno+='Marzo';
              break;
            case 4:
              retorno+='Abril';
              break;
            case 5:
              retorno+='Mayo';
              break;
            case 6:
              retorno+='Junio';
              break;
            case 7:
              retorno+='Julio';
              break;
            case 8:
              retorno+='Agosto';
              break;
            case 9:
              retorno+='Septiembre';
              break;
            case 10:
              retorno+='Octubre';
              break;
            case 11:
              retorno+='Noviembre';
              break;
            case 12:
              retorno+='Diciembre';
              break;
          }
          break;
      }
      return retorno
}
}
