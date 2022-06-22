import { Component,OnInit, Output, EventEmitter } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { UsuariosClinica } from 'src/app/clases/usuariosClinica';
import { UsersService } from 'src/app/componentes/services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/componentes/services/auth.service';
import { HistoriaMedicaService } from 'src/app/componentes/services/historia-medica.service';
import { HistoriaClinica } from 'src/app/clases/historiaClinica';
import { TurnoService } from 'src/app/componentes/services/turno.service';
import { FirestoreService } from '../../componentes/services/firestore.service';
import { Turno } from 'src/app/clases/turno';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {
  // @Output() mostrarResenia:EventEmitter<any> = new EventEmitter<any>();

  mostrandoResenia!:boolean;
  turnoPaResenia!:Turno | undefined;

  usuarioActual:any = this.authSvc.usuarioIngresado;
  listadoPacietnes:UsuariosClinica[] = [];
  listadoEspecialistas:Especialista[]=[];

  pacienteSeleccionado!:any;
  historiasClinicas:HistoriaClinica[]=[];

  misPacientes:UsuariosClinica[]=[];
  constructor(private authSvc:AuthService, private users:UsersService, private router:Router,private fs:FirestoreService,private turno:TurnoService ,private historiaClinica:HistoriaMedicaService) { }

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
   // console.log('lista de pacientes', this.listadoPacietnes);
  }

  verUsuario(paciente:UsuariosClinica)
  {
    this.pacienteSeleccionado = paciente;
    let turnoHistorial
    this.historiaClinica.traerTodosByPaciente(this.pacienteSeleccionado.id).subscribe(historiasClinicas => {
     // turnoHistorial=historiasClinicas.;
     // this.turno.traerTodosByIdTurno(turnoHistorial.idTurno)
     //this.fs.obtenerById('turno')
      this.historiasClinicas = historiasClinicas;
      this.historiasClinicas.forEach(historia => {
              this.turno.traerTodosByIdTurno(historia.idTurno).subscribe(elTurno => {
                historia.turno={hora:elTurno[0].hora,dia:elTurno[0].fechaCreacion}
                historia.turnoEntero=elTurno[0];
              })
              console.log('clinica mas completa', this.historiasClinicas);

        
      });
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
  turnoElegido()
  {
   // console.log('llega a turnoElegido');
    this.mostrandoResenia = true;
  }
  verResenia(turno:Turno | undefined)
  {
    // this.mostrarResenia.emit(turno);
    this.turnoPaResenia = turno;
    this.mostrandoResenia = true;
  }
  dejarDeMostrarResenia(e:any)
  {
    this.mostrandoResenia = e;
  }


  descargarExcel(persona:any)
  {
    let workbook = new Workbook();

    let hojaAdmins = workbook.addWorksheet(persona.nombre+'_'+persona.apellido);
 
    let adminsHeader=['Especialidad','Nombre ESP','Apellido ESP','Hora', 'Fecha','Duracion (min)','Estado'];
    let adminsEspHeader=['Especialidad','Nombre PAC','Apellido PACI','Hora', 'Fecha','Duracion (min)','Estado'];
 
   // hojaAdmins.addRow(adminsHeader);
 console.log(persona)
    if(persona.perfil=='paciente'){
      hojaAdmins.addRow(adminsHeader);
          let hola=this.turno.traerTodosByPaciente(persona.id).subscribe(turnos => {

            let turno:any[]=[]
                turnos.forEach(element => {
                  let nombreEsp:any=""
                  let apellidoEsp:any=""
          this.listadoEspecialistas.forEach(esp => {
            if(element.idEspecialista == esp.id)
            {
              nombreEsp = esp.nombre;
              apellidoEsp = esp.apellido;
            }
          });
                  turno.push({
                    especilidad:element.especialidad,
                    nombre:nombreEsp,
                    apellido:apellidoEsp,
                    hora:element.hora,
                  fecha:this.formatoFecha(element.fechaCreacion) ,
                  duracion:element.duracion ,
                  estado:element.estado
                })
                });
            

              for(let element of turno)
              {
                let x2=Object.keys(element);
                let temp=[];

                for(let y of x2)
                {
                  temp.push(element[y])
                }
          
                hojaAdmins.addRow(temp);
              }

              

              let fname="UsersData";

              //add data and file name and download
              workbook.xlsx.writeBuffer().then((data) => {
                let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                fs.saveAs(blob, persona.nombre+'_'+persona.apellido+'-'+new Date().valueOf()+'.xlsx');
              });
          hola.unsubscribe()
            })
          }
          //ESPECIALISTA
        else if(persona.perfil=='especialista'){
          hojaAdmins.addRow(adminsEspHeader);

          let hola=this.turno.traerTodosByEspecialista(persona.id).subscribe(turnos => {

            let turno:any[]=[]
                turnos.forEach(element => {
                  let nombreEsp:any=""
                  let apellidoEsp:any=""
          this.listadoPacietnes.forEach(paciente => {
            if(element.idPaciente == paciente.id)
            {
              nombreEsp = paciente.nombre;
              apellidoEsp = paciente.apellido;
            }
          });
                  turno.push({
                    especilidad:element.especialidad,
                    nombre:nombreEsp,
                    apellido:apellidoEsp,
                    hora:element.hora,
                  fecha:this.formatoFecha(element.fechaCreacion) ,
                  duracion:element.duracion ,
                  estado:element.estado
                })
                });
            

              for(let element of turno)
              {
                let x2=Object.keys(element);
                let temp=[];

                for(let y of x2)
                {
                  temp.push(element[y])
                }
          
                hojaAdmins.addRow(temp);
              }

              

              let fname="UsersData";

              //add data and file name and download
              workbook.xlsx.writeBuffer().then((data) => {
                let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                fs.saveAs(blob, persona.nombre+'_'+persona.apellido+'-'+new Date().valueOf()+'.xlsx');
              });
          hola.unsubscribe()
            })
        }
  
  
  }



  formatoFecha(value:any){
    let fecha = new Date(value);
    let dia    
    let mes
//alert(typeof fecha.getDate())
    if(fecha.getDate() >10){
      dia=fecha.getDate();
    }
    else{
      dia='0'+fecha.getDate();
    }

    if((fecha.getMonth()+1) >10){
      mes=(fecha.getMonth()+1);
    }
    else{
      mes='0'+(fecha.getMonth()+1);
    }
    return dia+'/'+mes+'/'+fecha.getFullYear();
   }
  
}
