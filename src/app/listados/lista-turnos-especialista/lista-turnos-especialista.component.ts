import { Component, OnInit, Output, EventEmitter } from '@angular/core';
 import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/componentes/services/auth.service';
import { FirestoreService } from 'src/app/componentes/services/firestore.service';
import { HistoriaMedicaService } from 'src/app/componentes/services/historia-medica.service';
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
hola="aceptado"
  listadoPacientes:any[] = [];
  @Output() mostrarResenia:EventEmitter<any> = new EventEmitter<any>();

  cantidadOtros:any;
  cantidadArray:number[] = [];
  carga:boolean=false;

  stringFiltro = '';
  constructor(private authSvc:AuthService, private firestore:FirestoreService,private users:UsersService,private turno:TurnoService,private historiaClinica:HistoriaMedicaService) { }

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
    let paciente
    this.firestore.obtenerById("usuariosClinica",turno.idPaciente).toPromise().then(async(ingreso)=>{
      /* this.authSvc.usuarioIngresado="";
       this.ajam=null;*/
       //alert(this.ajam)
       //alert("ddsf")
         //console.log(ingreso.payload.data());
          paciente = ingreso?.data()

         console.log(paciente);
      //alert("hola")
         
  
       
    //if(user ){this.ajam=ingreso?.data();
    })
    console.log("no tendria que entrar")
    console.log(paciente)
    //alert("para")
    console.log(paciente)

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


      // turno.estado = 'finalizado';
      // turno.resenia = true;
      // turno.comentarioEspecialista = result.value!.comentario;
      // turno.diagnostico = result.value!.diagnostico;

      Swal.fire({
        title: 'Cargar historia Clinica',
        html: `<input type="text" id="altura" class="swal2-input" placeholder="Altura (En metros)">
        <input type="text" id="peso" class="swal2-input" placeholder="Peso (En kilos)">,
        <input type="text" id="temperatura" class="swal2-input" placeholder="Temperatura (En ~Grado Celcius)">
        <input type="text" id="presion" class="swal2-input" placeholder="Presión"><br>
        <span>Otros<span>
        <div class="row">
        <div class="col-6">
        <input type="text" id="clave1" class="swal2-input col-6" placeholder="Clave (opcional)">
        </div>
        <div class="col-6">
        <input type="text" id="valor1" class="swal2-input col-6" placeholder="Valor (opcional)">
        </div>
        <div class="col-6">
        <input type="text" id="clave2" class="swal2-input col-6" placeholder="Clave (opcional)">
        </div>
        <div class="col-6">
        <input type="text" id="valor2" class="swal2-input col-6" placeholder="Valor (opcional)">
        </div>
        <div class="col-6">
        <input type="text" id="clave3" class="swal2-input col-6" placeholder="Clave (opcional)">
        </div>
        <div class="col-6">
        <input type="text" id="valor3" class="swal2-input col-6" placeholder="Valor (opcional)">
        </div>
        </div>
        `,
        confirmButtonText: 'Enviar',
        focusConfirm: false,
        preConfirm: () => {
          let altura!:any;
          let peso!:any;
          let temperatura!:any;
          let presion!:any;

          let clave1!:any;
          let valor1!:any;
          let clave2!:any;
          let valor2!:any;
          let clave3!:any;
          let valor3!:any;

          let otros:any = [];

          altura = (<HTMLInputElement>Swal.getPopup()!.querySelector('#altura')).value;
          peso = (<HTMLInputElement>Swal.getPopup()!.querySelector('#peso')).value;
          temperatura = (<HTMLInputElement>Swal.getPopup()!.querySelector('#temperatura')).value;
          presion = (<HTMLInputElement>Swal.getPopup()!.querySelector('#presion')).value;

          clave1 = (<HTMLInputElement>Swal.getPopup()!.querySelector('#clave1')).value;
          valor1 = (<HTMLInputElement>Swal.getPopup()!.querySelector('#valor1')).value;
          clave2 = (<HTMLInputElement>Swal.getPopup()!.querySelector('#clave2')).value;
          valor2 = (<HTMLInputElement>Swal.getPopup()!.querySelector('#valor2')).value;
          clave3 = (<HTMLInputElement>Swal.getPopup()!.querySelector('#clave3')).value;
          valor3 = (<HTMLInputElement>Swal.getPopup()!.querySelector('#valor3')).value;

          if (!altura || !peso || !temperatura || !presion) {
            Swal.showValidationMessage(`Cargue historia clinica! (Los parametros obligatorios)`)
          }

          if(clave1 && valor1)
          {
            otros.push({clave:clave1, valor:valor1});
          }
          if(clave2 && valor2)
          {
            otros.push({clave:clave2, valor:valor2});
          }
          if(clave3 && valor3)
          {
            otros.push({clave:clave3, valor:valor3});
          }
          return { altura: altura, peso: peso, temperatura:temperatura, presion:presion, otros:otros }
        }
      }).then(resultado => {

        // this.firestore.actualizar('turnos', turno.id, turno).then(()=>{
         
        // })

        // this.firestore.obtenerById("usuariosClinica",turno.idPaciente).toPromise().then(async(ingreso)=>{
        //      this.firestore.obtenerById("usuariosClinica",turno.idPaciente).toPromise().then(async(esp)=>{
        //       let paciente:any = ingreso?.data()
        //       let especialista:any= esp?.data()
        //       console.log(paciente);
        //       paciente.historiaClinica=
        //       this.firestore.actualizar('usuariosClinica',turno.idPaciente,paciente)
        //       this.firestore.actualizar('usuariosClinica',turno.idEspecialista,especialista).then(()=>{
          this.firestore.actualizar('turno', turno.id, turno).then(()=>{

                  this.historiaClinica.crearHistoriaMedica(turno, resultado.value!.altura, resultado.value!.peso, resultado.value!.temperatura, resultado.value!.presion, resultado.value!.otros);
              Swal.fire('Historia clinica cargada!');
            })
      
        //      })
        //  })
        this.PantallaCarga();

        setTimeout(() => {
          this.SacarPantallaCarga()
         }, 2000);
      // })
    });
  })
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

  PantallaCarga(){
    var x = window.scrollX;
        var y = window.scrollY;
        window.onscroll = function(){ window.scrollTo(x, y) };
     this.carga=true
  }
  
   SacarPantallaCarga(){
        window.onscroll = function(){ };
        this.carga=false
      }
}
