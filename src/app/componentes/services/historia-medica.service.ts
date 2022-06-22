import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Turno } from 'src/app/clases/turno';
import { HistoriaClinica } from 'src/app/clases/historiaClinica';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HistoriaMedicaService {
  public listadoHistorial:any[] = [];

  referenciaColeccion:AngularFirestoreCollection;
  constructor(private router:Router,  private firestore:FirestoreService, private authSvc:AuthService, private afs:AngularFirestore) {
    this.referenciaColeccion = this.afs.collection('historiasMedicas', ref => ref.orderBy('fecha', 'desc'));
    
    this.firestore.obtenerTodos('historiasMedicas').subscribe((usuariosSnapshot) => {
      this.listadoHistorial = [];
      usuariosSnapshot.forEach((usuarioData: any) => {
        let data = usuarioData.payload.doc.data();
        this.listadoHistorial.push(data);

      })
    })


   }

   crearHistoriaMedica(turno:Turno, altura:number, peso:number, temperatura:number, presion:number, otros:any)
   {
 this.firestore.obtenerById("usuariosClinica",turno.idPaciente).toPromise().then(async(ingreso)=>{

    let pacienteAgregar:any = ingreso?.data()
    let guardarPaciente={nombre:pacienteAgregar.nombre,apellido:pacienteAgregar.apellido}


   let especialistaAgregar:any= this.authSvc.usuarioIngresado
   let guardarEsp={nombre:especialistaAgregar.nombre,apellido:especialistaAgregar.apellido,especialidad:especialistaAgregar.especialidad}


     let historiaMedica:HistoriaClinica = {id:this.afs.createId(),
       idPaciente:turno.idPaciente,
       idEspecialista:turno.idEspecialista,
       idTurno:turno.id,
       altura:altura,
       fecha:new Date().getTime(),
       peso:peso,
       temepratura:temperatura,
       presion:presion,
       especialista:guardarEsp,
       paciente:guardarPaciente,
       otros:otros};
       console.log(historiaMedica)
       pacienteAgregar.historiaClinica=[]
       pacienteAgregar.historiaClinica.push(historiaMedica)

       turno.historiaClinica=historiaMedica

                 especialistaAgregar.historiaClinica=[]
                 especialistaAgregar.historiaClinica.push(historiaMedica)
                 this.firestore.actualizar('usuariosClinica',turno.idEspecialista,especialistaAgregar);
                 this.firestore.actualizar('usuariosClinica',turno.idPaciente,pacienteAgregar);
                 this.firestore.actualizar('turno',turno.id,turno);
       // agregar spinner
       console.log(historiaMedica)

      this.firestore.actualizar('historiasMedicas', historiaMedica.id, historiaMedica).then(()=>{
       // terminar spinner
        Swal.fire({
         title:'Historia Clinica Creada',
         icon:'success',
         text:'Historia Clinica creada exitosamente',
         cancelButtonText:'Cerrar',
       });
     });
    });
   }
  //  crearHistoriaMedica(turno:Turno, altura:number, peso:number, temperatura:number, presion:number, otros:any)
  // {
   

  //     // agregar spinner
  //     //this.spinner.show();
      
  //     this.firestore.obtenerById("usuariosClinica",turno.idPaciente).toPromise().then(async(ingreso)=>{
  //            // let pacienteAgregar:any = ingreso?.data()
  //             let especialistaAgregar:any= this.authSvc.usuarioIngresado
  //             //console.log(pacienteAgregar);
  //             // paciente.historiaClinica=
              

  //           let historiaMedica:HistoriaClinica = {id:this.afs.createId(),
  //                 idPaciente:turno.idPaciente,
  //                 idEspecialista:turno.idEspecialista,
  //                 idTurno:turno.id,
  //                 altura:altura,
  //                 fecha:new Date().getTime(),
  //                 peso:peso,
  //                 temepratura:temperatura,
  //                 presion:presion,
  //                 otros:otros,
  //                // paciente:pacienteAgregar,
  //                 especialista:especialistaAgregar
  //                 };
  //                 //pacienteAgregar.historiaClinica=[];
  //                 especialistaAgregar.historiaClinica=[]
  //                 //pacienteAgregar.historiaClinica.push(historiaMedica)
  //                 especialistaAgregar.historiaClinica.push(historiaMedica)
  //                 //this.firestore.actualizar('usuariosClinica',turno.idPaciente,pacienteAgregar);
  //             this.firestore.actualizar('usuariosClinica',turno.idEspecialista,especialistaAgregar);
  //             this.firestore.actualizar('historiasMedicas', historiaMedica.id, historiaMedica).then(()=>{
  //                   // terminar spinner
  //                   //this.spinner.hide();
  //                   Swal.fire({
  //                     title:'Historia Clinica Creada',
  //                     icon:'success',
  //                     text:'Historia Clinica creada exitosamente',
  //                     cancelButtonText:'Cerrar',
  //                   });
  //                 });
  //     });


      
   
  // }

  traerTodos()
  {
    return this.referenciaColeccion.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as HistoriaClinica))
    );
  }

  traerTodosByEspecialista(idEspecialista:string)
  {
    return this.traerTodos().pipe(
      map(turnos => turnos.filter(
        turno => turno.idEspecialista == idEspecialista))
    );
  }

  traerTodosByPaciente(idPaciente:string)
  {
    return this.traerTodos().pipe(
      map(turnos => turnos.filter(
        turno => turno.idPaciente == idPaciente))
    );
  }
}
