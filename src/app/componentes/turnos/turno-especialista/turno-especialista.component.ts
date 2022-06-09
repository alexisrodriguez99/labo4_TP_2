import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-turno-especialista',
  templateUrl: './turno-especialista.component.html',
  styleUrls: ['./turno-especialista.component.scss']
})
export class TurnoEspecialistaComponent implements OnInit {

  @Input() especialidadElegida:any;
  @Output() seleccionarEspecialista:EventEmitter<any> = new EventEmitter<any>();
  listaEspecialistas:any[] = [];
  especialistasFiltrados:any[] = [];
  constructor(private firestore:FirestoreService) { }

  ngOnInit(): void {
    console.log(this.especialidadElegida)
    this.firestore.obtenerTodos('usuariosClinica').subscribe((usuariosSnapshot) => {
      this.listaEspecialistas = [];
      usuariosSnapshot.forEach((usuarioData: any) => {
    
        let data = usuarioData.payload.doc.data();
        if(data.perfil == 'especialista')
        {
          this.listaEspecialistas.push({
            dni:data.dni,
            apellido:data.apellido,
            aprobado:data.aprobado,
            contrasenia:data.contrasenia,
            edad:data.edad,
            especialidad:data.especialidad,
            img1:data.img1,
            id:data.id,
            mail:data.mail,
            nombre:data.nombre,
            perfil:data.perfil,
            verificado:data.verificado,
            horario:data.horario,
            diasLaborables:data.diasLaborables});
        }
      });
      //console.log(this.listaEspecialistas)
      this.listaEspecialistas.forEach(element => {
        if(element.especialidad.includes(this.especialidadElegida))
        {
          this.especialistasFiltrados.push(element);
        }
      });
    });
  }

  elegirEspecialista(especialista:any)
  {
    this.seleccionarEspecialista.emit(especialista);
  }

}
