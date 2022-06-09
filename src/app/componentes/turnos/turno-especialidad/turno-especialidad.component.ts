import { Component,OnInit, Output, EventEmitter } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
 @Component({
  selector: 'app-turno-especialidad',
  templateUrl: './turno-especialidad.component.html',
  styleUrls: ['./turno-especialidad.component.scss']
})
export class TurnoEspecialidadComponent implements OnInit {

  @Output() especialidadElegida:EventEmitter<any> = new EventEmitter<any>();

  listadoEspecialidades:any[] = [];

  constructor(private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.firestore.obtenerTodos('especialidades').subscribe((usuariosSnapshot) => {
      this.listadoEspecialidades = [];
      usuariosSnapshot.forEach((usuarioData: any) => {
        let data = usuarioData.payload.doc.data();
        this.listadoEspecialidades.push(usuarioData.payload.doc.data());
        //console.log(usuarioData.payload.doc.data());
      });
    });
  }

  elegirEspecialidad(especialidad:string)
  {
    this.especialidadElegida.emit(especialidad);
  }

}
