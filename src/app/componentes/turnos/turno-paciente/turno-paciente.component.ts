import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-turno-paciente',
  templateUrl: './turno-paciente.component.html',
  styleUrls: ['./turno-paciente.component.scss']
})
export class TurnoPacienteComponent implements OnInit {
  @Output() seleccionarPaciente:EventEmitter<any> = new EventEmitter<any>();
  listaPacientes:any[] = [];
  pacientesFiltrados:any[] = [];

  constructor(private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.firestore.obtenerTodos('usuariosClinica').subscribe((usuariosSnapshot) => {
      this.listaPacientes = [];
      usuariosSnapshot.forEach((usuarioData: any) => {
        let data = usuarioData.payload.doc.data();
        if(data.perfil == 'paciente')
        {
          this.pacientesFiltrados.push(data);

           
        }
      });
    
    });
  }
  elegirPaciente(paciente:any)
  {
    this.seleccionarPaciente.emit(paciente);
  }
}
