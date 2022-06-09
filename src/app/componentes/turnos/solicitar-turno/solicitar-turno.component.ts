import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { UsuariosClinica } from 'src/app/clases/usuariosClinica';
import { TurnoService } from '../../services/turno.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {
   estadoAlta:number = 1;

  pacienteSeleccionado:any;
  especialistaSeleccionado:any;
  especialidadSeleccionada:any;
  diaSeleccionado:any;
  horarioSeleccionado:any;

  listadoEspecialistas:any[] = [];
  listadoPacientes:UsuariosClinica[] = [];
  listadoEspecialidades:any[] = [];
  constructor(private turno:TurnoService ,private router:Router, public authSvc:AuthService, private firestore:FirestoreService, private usuarios:UsersService) { }

  ngOnInit(): void {
    this.firestore.obtenerTodos('especialidades').subscribe((repatidor)=>{
      this.listadoEspecialidades =[];
      repatidor.forEach((unRepartidor:any)=>{
//if(unRepartidor.estado=="listo sin entregar")
this.listadoEspecialidades.push(unRepartidor.payload.doc.data());
     console.log(unRepartidor.payload.doc.data());
      });
     
    });
    if(this.authSvc.usuarioIngresado.perfil == 'paciente')
    {
      this.pacienteSeleccionado = this.authSvc.usuarioIngresado;
      this.estadoAlta++;
    }

  }

  elegirEspecialidad(especialidad:any)
  {
    this.especialidadSeleccionada = especialidad;

    // Me fijo si tenia uno o mas especialistas de esa especialidad
    let auxArray:Especialista[] = [];
    this.listadoEspecialistas.forEach(element => {
      if(element.especialidad.includes(especialidad) )
      {
        auxArray.push(element);
      }
    });

    if(auxArray.length == 1)
    {
      this.especialistaSeleccionado = auxArray.pop();
      this.estadoAlta = this.estadoAlta+2;
    }
    else
    {
      this.estadoAlta++;
    }

  }
  elegirEspecialista(especialista:string)
  {
    this.especialistaSeleccionado = especialista;
    this.estadoAlta++;
  }

  elegirDia(dia:any)
  {
    this.diaSeleccionado = dia;
    this.estadoAlta++;
  }

  elegirHorario(hora:any)
  {
    this.horarioSeleccionado = hora;
   // console.log(this.horarioSeleccionado)
   if(this.authSvc.usuarioIngresado.perfil=="paciente"){
         this.horarioSeleccionado.idPaciente=this.authSvc.usuarioIngresado.id;
   }
   else if(this.authSvc.usuarioIngresado.perfil=="admin"){
    this.horarioSeleccionado.idPaciente=this.pacienteSeleccionado.id;
   }
    this.horarioSeleccionado.estado="pendiente";
   // this.turno.crearTurno(this.pacienteSeleccionado.id, this.especialistaSeleccionado.id, this.especialidadSeleccionada, this.diaSeleccionado, this.horarioSeleccionado);
    this.firestore.actualizar("turno",this.horarioSeleccionado.id,this.horarioSeleccionado).then(()=>{
       this.router.navigate(['home']);
     });
  }

  volverAtras()
  {
    this.estadoAlta--;
  }

  volverAHome()
  {
    this.router.navigateByUrl('/home');
  }
  elegirPaciente(paciente:any)
  {
    this.pacienteSeleccionado = paciente;
    this.estadoAlta++;
  }
}
