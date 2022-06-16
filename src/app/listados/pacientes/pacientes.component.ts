import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { UsuariosClinica } from 'src/app/clases/usuariosClinica';
import { UsersService } from 'src/app/componentes/services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/componentes/services/auth.service';
import { HistoriaMedicaService } from 'src/app/componentes/services/historia-medica.service';
import { HistoriaClinica } from 'src/app/clases/historiaClinica';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  usuarioActual:any = this.authSvc.usuarioIngresado;
  listadoPacietnes:UsuariosClinica[] = [];
  listadoEspecialistas:Especialista[]=[];

  pacienteSeleccionado!:any;
  historiasClinicas:HistoriaClinica[]=[];

  misPacientes:UsuariosClinica[]=[];
  constructor(private authSvc:AuthService, private users:UsersService, private router:Router, private historiaClinica:HistoriaMedicaService) { }

  ngOnInit(): void {
    this.listadoPacietnes = this.users.listadoPacientes;
    this.listadoEspecialistas = this.users.listadoEspecialistas;


    // Si es especialista, me trae los usuarios a los que atendió
    if(this.usuarioActual.perfil == 'especialista')
    {
      this.historiaClinica.traerTodosByEspecialista(this.usuarioActual.id).subscribe(historiasClinicas => {
        historiasClinicas.forEach(historia => {
          this.listadoPacietnes.forEach(paciente => {
            if(historia.idPaciente == paciente.id && !this.misPacientes.includes(paciente))
            {
              this.misPacientes.push(paciente);
            }
          });
        });
      });
    }
    console.log('lista de pacientes', this.listadoPacietnes);
  }

  verUsuario(paciente:UsuariosClinica)
  {
    this.pacienteSeleccionado = paciente;
    this.historiaClinica.traerTodosByPaciente(this.pacienteSeleccionado.id).subscribe(historiasClinicas => {
      this.historiasClinicas = historiasClinicas;
      console.log('me trajo las histprias clinicas', this.historiasClinicas);
      console.log('el id de mi bicho actual', this.usuarioActual.id);
    })
  }

  verDetalles(historiaClinica:any)
  {
    let html = `Altura: ${historiaClinica.altura}<br>
    Peso: ${historiaClinica.peso}<br>
    temperatura: ${historiaClinica.temperatura}<br>
    presion: ${historiaClinica.presion}<br>`;

    historiaClinica.otros.forEach((element:any) => {
      console.log(element);
      html+=`${element.clave}: ${element.valor}<br>`
    });

    Swal.fire({
      title:'Historia Clinica:',
      html:html,
    });
  }

  quitarDetalles()
  {
    this.pacienteSeleccionado = null;
  }

}
