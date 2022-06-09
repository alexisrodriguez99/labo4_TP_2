import { Component, OnInit, Output, EventEmitter } from '@angular/core';
 import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/componentes/services/auth.service';
import { FirestoreService } from 'src/app/componentes/services/firestore.service';
import { TurnoService } from 'src/app/componentes/services/turno.service';
import { UsersService } from 'src/app/componentes/services/users.service';
    
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lista-turnos-especialista',
  templateUrl: './lista-turnos-especialista.component.html',
  styleUrls: ['./lista-turnos-especialista.component.scss']
})
export class ListaTurnosEspecialistaComponent implements OnInit {
  turnosExistentes:any[] = [];
  turnosFiltrados:Turno[] = [];

  listadoPacientes:any[] = [];
  @Output() mostrarResenia:EventEmitter<any> = new EventEmitter<any>();

  cantidadOtros:any;
  cantidadArray:number[] = [];

  stringFiltro = '';
  constructor(private authSvc:AuthService, private firestore:FirestoreService,private users:UsersService,private turno:TurnoService) { }

  ngOnInit(): void {
    this.listadoPacientes = this.users.listadoPacientes;
    console.log(this.listadoPacientes);

    // Obtengo todos los turnos del especialista seleccionado
    this.turno.traerTodosByEspecialista(this.authSvc.usuarioIngresado.id).subscribe(turnos => {
      this.turnosExistentes = turnos;
      this.turnosFiltrados = this.turnosExistentes.slice();
      console.log(this.turnosFiltrados);
      // console.info('turnos', this.turnosExistentes);
    });
  }
  cancelarTurno(turno:Turno)
  {
    Swal.fire({
      title: 'Dejá tu comentario',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        turno.estado = 'cancelado';
        turno.resenia = true;
        turno.comentarioEspecialista = result.value;
        this.firestore.actualizar('turno', turno.id, turno);
      }
    })
  }
  rechazarTurno(turno:Turno)
  {
    Swal.fire({
      title: 'Dejá tu comentario',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        turno.estado = 'rechazado';
        turno.resenia = true;
        turno.comentarioEspecialista = result.value;
        this.firestore.actualizar('turno', turno.id, turno);
      }
    })
  }
  aceptarTurno(turno:Turno)
  {
    turno.estado = 'aceptado';
    this.firestore.actualizar('turno', turno.id, turno);
  }
  finalizarTurno(turno:Turno)
  {
    Swal.fire({
      title: 'Dejá tu reseña',
      html: `<input type="text" id="comentario" class="swal2-input" placeholder="Comentario">
      <input type="text" id="diagnostico" class="swal2-input" placeholder="Diagnostico">`,
      confirmButtonText: 'Enviar',
      focusConfirm: false,
      preConfirm: () => {
        let comentario!:any;
        let diagnostico!:any;
        comentario = (<HTMLInputElement>Swal.getPopup()!.querySelector('#comentario')).value;
        diagnostico = (<HTMLInputElement>Swal.getPopup()!.querySelector('#diagnostico')).value;
        if (!comentario || !diagnostico) {
          Swal.showValidationMessage(`Cargue resenña!`)
        }
        return { comentario: comentario, diagnostico: diagnostico }
      }
    }).then((result) => {
      turno.estado = 'finalizado';
      turno.resenia = true;
      turno.comentarioEspecialista = result.value!.comentario;
      turno.diagnostico = result.value!.diagnostico;
      this.firestore.actualizar('turno', turno.id, turno);

    });
  }

  filtrar()
  {
    if(this.stringFiltro != '')
    {
      console.log('entra aca');
      let indiceEliminar:number[]=[];
      this.turnosFiltrados = this.turnosExistentes.slice();

      this.turnosFiltrados.forEach((element, index) => {
        // Filtro por especialistas
        let especialista=false;
        for(let i = 0;i < this.listadoPacientes.length; i++)
        {
          if(element.idPaciente == this.listadoPacientes[i].id && (this.listadoPacientes[i].nombre.toLowerCase().includes(this.stringFiltro.toLowerCase()) || this.listadoPacientes[i].apellido.toLowerCase().includes(this.stringFiltro.toLowerCase())))
          {
            especialista = true;
            break;
          }
        }

        // Filtro por especialidad
        let especialidad=false;
        if(element.especialidad.toLowerCase().includes(this.stringFiltro.toLowerCase()))
        {
          especialidad=true;
        }

        // Filtro por fecha
        let fecha = new Date(element.fechaCreacion);
        let fechaProgramada = fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
        let filtroFecha=false;
        if(fechaProgramada.toLowerCase().includes(this.stringFiltro.toLowerCase()))
        {
          filtroFecha=true;
        }

        // Filtro por horario
        let filtroHorario=false;
        if(element.hora.toLowerCase().includes(this.stringFiltro.toLowerCase())){
          filtroHorario=true;
        }

        // Filtro por estado
        let filtroEstado=false;
        if(element.estado.toLowerCase().includes(this.stringFiltro.toLowerCase())){
          filtroEstado=true;
        }

        if(!especialista && !especialidad && !filtroFecha && !filtroHorario && !filtroEstado)
        {
          console.log('me esta funcando el filtro', element);
          indiceEliminar.push(index);
        }
      });

      let cont=0;
      indiceEliminar.forEach(element => {
        this.turnosFiltrados.splice((element-cont),1);
        cont++;
      });
    }
  }
  limpiarFiltro()
  {
    this.turnosFiltrados = this.turnosExistentes.slice();
  }
  verResenia(turno:Turno)
  {
    this.mostrarResenia.emit(turno);
  }
}
