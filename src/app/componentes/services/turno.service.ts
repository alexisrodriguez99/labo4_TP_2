import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
 import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';
import { map } from 'rxjs/operators';
 import { Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Turno } from 'src/app/clases/turno';
@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  referenciaColeccion:AngularFirestoreCollection;

  constructor(private router:Router, private firestore:FirestoreService, private authSvc:AuthService, private afs:AngularFirestore) {
    this.referenciaColeccion = this.afs.collection('turno', ref => ref.orderBy('fechaCreacion', 'desc'));
  }

  traerTodos()
  {
    return this.referenciaColeccion.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Turno))
    )
  }

   
traerTodosReportes(){
  return this.traerTodos().pipe(
    map(turnos => turnos.filter(
      turno => turno.estado!="libre"))
  );
}
  traerTodosByEspecialista(idEspecialista:string)
  {
    return this.traerTodos().pipe(
      map(turnos => turnos.filter(
        turno => turno.idEspecialista == idEspecialista && turno.estado!="libre"))
    );
  }

  traerTodosByPaciente(idPaciente:string)
  {
    return this.traerTodos().pipe(
      map(turnos => turnos.filter(
        turno => turno.idPaciente == idPaciente))
    );
  }
  traerTodosByAdmin()
  {
    return this.traerTodos().pipe(
      map(turnos => turnos.filter(
        turno => turno.estado!="libre"))
    );
  }
  traerEntreFechas(desde:number, hasta:number,tipofecha?:string)
  {
    let reference
    if(tipofecha){
      reference = this.afs.collection('turno', ref => ref.where(tipofecha, '>=', desde).where(tipofecha, '<=', hasta));
    }
    else{
      reference = this.afs.collection('turno', ref => ref.where('fechaTurnoPedido', '>=', desde).where('fechaTurnoPedido', '<=', hasta));
    }
    return reference.snapshotChanges().pipe(
      map(actions =>  actions.map(a => a.payload.doc.data() as Turno))
    ).pipe(
      map(turnos => turnos.filter(
        turno =>  turno.estado!="libre"))
    );
  }

  traerFechaDesde(desde:number,tipofecha?:string)
  {
    let reference
    if(tipofecha){
      reference = this.afs.collection('turno', ref => ref.where(tipofecha, '>=', desde));
    }
    else{
      reference = this.afs.collection('turno', ref => ref.where('fechaTurnoPedido', '>=', desde));
    }
    return reference.snapshotChanges().pipe(
      map(actions =>  actions.map(a => a.payload.doc.data() as Turno))
    ).pipe(
      map(turnos => turnos.filter(
        turno =>  turno.estado!="libre"))
    );
  }

  traerFechaHasta(hasta:number,tipofecha?:string)
  {
    let reference
    if(tipofecha){
      reference = this.afs.collection('turno', ref => ref.where(tipofecha, '<=', hasta));
    }
    else{
      reference = this.afs.collection('turno', ref => ref.where('fechaTurnoPedido', '<=', hasta));
    }
    return reference.snapshotChanges().pipe(
      map(actions =>  actions.map(a => a.payload.doc.data() as Turno))
    )
  }
}
