import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/componentes/services/auth.service';
import { FirestoreService } from 'src/app/componentes/services/firestore.service';
import { TurnoService } from 'src/app/componentes/services/turno.service';
import { UsersService } from 'src/app/componentes/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-turnos-admin',
  templateUrl: './lista-turnos-admin.component.html',
  styleUrls: ['./lista-turnos-admin.component.scss']
})
export class ListaTurnosAdminComponent implements OnInit {
  turnosExistentes:any[] = [];
  turnosFiltrados:Turno[] = [];

  listadoPacientes:any[] = [];
  listadoEspecialistas:any[] = [];

  stringFiltro:string = '';
  constructor(private turno:TurnoService, private authSvc:AuthService, private users:UsersService, private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.listadoPacientes = this.users.listadoPacientes;
    this.listadoEspecialistas = this.users.listadoEspecialistas;

    // Obtengo todos los turnos del especialista seleccionado
    this.turno.traerTodosByAdmin().subscribe(turnos => {
      this.turnosExistentes = turnos;
      this.turnosFiltrados = this.turnosExistentes.slice();
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
        turno.comentarioAdmin = result.value;
        this.firestore.actualizar('turno', turno.id, turno);
      }
    })
  }

  filtrar()
  {
    if(this.stringFiltro != '')
    {
      console.log('entra aca');
      let indiceEliminar:number[]=[];
      this.turnosFiltrados.forEach((element, index) => {
        // Filtro por pacientes
        let paciente=false;
        for(let i = 0;i < this.listadoPacientes.length; i++)
        {
          if(element.idPaciente == this.listadoPacientes[i].id && (this.listadoPacientes[i].nombre.toLowerCase().includes(this.stringFiltro.toLowerCase()) || this.listadoPacientes[i].apellido.toLowerCase().includes(this.stringFiltro.toLowerCase())))
          {
            paciente = true;
            break;
          }
        }

        // Filtro por especialistas
        let especialista=false;
        for(let i = 0;i < this.listadoEspecialistas.length; i++)
        {
          if(element.idEspecialista == this.listadoEspecialistas[i].id && (this.listadoEspecialistas[i].nombre.toLowerCase().includes(this.stringFiltro.toLowerCase()) || this.listadoEspecialistas[i].apellido.toLowerCase().includes(this.stringFiltro.toLowerCase())))
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

        if(!paciente && !especialista && !especialidad && !filtroFecha && !filtroHorario && !filtroEstado)
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
}
