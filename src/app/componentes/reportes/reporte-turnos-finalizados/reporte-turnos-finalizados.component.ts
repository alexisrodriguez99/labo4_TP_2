import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { GraficoService } from '../../services/grafico.service';
import { PdfService } from '../../services/pdf.service';
import { TurnoService } from '../../services/turno.service';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reporte-turnos-finalizados',
  templateUrl: './reporte-turnos-finalizados.component.html',
  styleUrls: ['./reporte-turnos-finalizados.component.scss']
})
export class ReporteTurnosFinalizadosComponent implements OnInit {

  turnosEspecialistas:any[] = [];
  fechaDesde:string='';
  fechaHasta:string='';

  initSubscribe!:Subscription;
  filtradoSubscribe!:Subscription;

  @Output() cerrarTabla:EventEmitter<any> = new EventEmitter<any>();

  // mostrarTabla:boolean = true;
  // mostrarGrafico:boolean = false;
  mostrarTabla:boolean = false;
  mostrarGrafico:boolean = true;
  chart:any;

  constructor(private turnos:TurnoService, private users:UsersService, private pdf:PdfService, private grafico:GraficoService) { }

  ngOnInit(): void {

    // Consigo todos los especialistas activos
    this.users.listadoEspecialistas.forEach(especialista => {
     
        this.turnosEspecialistas.push({especialista:especialista, turnos:0});
    
    });

    this.initSubscribe = this.turnos.traerTodos().subscribe(turnos => {
      turnos.forEach(turno => {
        this.turnosEspecialistas.forEach(element => {
          if(turno.idEspecialista == element.especialista.id && turno.estado == 'finalizado')
          {
            element.turnos++;
          }
        });
      });
      this.crearGrafico();
    });
  }

  volver()
  {
    this.cerrarTabla.emit('');
  }

  Filtrar()
  {
    let desdeArray = this.fechaDesde.split('/');
    let hastaArray = this.fechaHasta.split('/');

    let desde;
    let hasta;
    let desdebool = false;
    let hastabool = false;

    if(this.fechaDesde.length < 10)
    {
      desde = 1;
    }
    else
    {
      desde = new Date(parseInt(desdeArray[2]), (parseInt(desdeArray[1])-1), parseInt(desdeArray[0])).getTime();
      desdebool = true;
    }

    if(this.fechaHasta.length < 10)
    {
      hasta = new Date().getTime();
    }
    else
    {
      hasta = new Date(parseInt(hastaArray[2]), (parseInt(hastaArray[1])-1), parseInt(hastaArray[0])).getTime();
      hastabool = true;
    }

    if(!this.initSubscribe.closed)
    {
      this.initSubscribe.unsubscribe();
    }

    this.turnosEspecialistas = [];
    this.users.listadoEspecialistas.forEach(especialista => {
     
        this.turnosEspecialistas.push({especialista:especialista, turnos:0});
      
    });

    if(desdebool && hastabool)
    {
      this.filtradoSubscribe = this.turnos.traerEntreFechas(desde, hasta,"fechaCreacion").subscribe(turnos => {
        this.turnosEspecialistas.forEach(element => {
          element.turnos=0
        })
        turnos.forEach(turno => {
          this.turnosEspecialistas.forEach(element => {
            if(turno.idEspecialista == element.especialista.id &&  turno.estado == 'finalizado')
            {
              element.turnos++;
            }
          });
        });
        this.crearGrafico();
      });
    }
    else if(desdebool && !hastabool)
    {
      this.filtradoSubscribe = this.turnos.traerFechaDesde(desde,"fechaCreacion").subscribe(turnos => {
        this.turnosEspecialistas.forEach(element => {
          element.turnos=0
        })
        turnos.forEach(turno => {
          this.turnosEspecialistas.forEach(element => {
            if(turno.idEspecialista == element.especialista.id &&  turno.estado == 'finalizado')
            {
              element.turnos++;
            }
          });
        });
        this.crearGrafico();
      });
    }
    else if(!desdebool && hastabool)
    {
      this.filtradoSubscribe = this.turnos.traerFechaHasta(hasta,"fechaCreacion").subscribe(turnos => {
        this.turnosEspecialistas.forEach(element => {
          element.turnos=0
        })
        turnos.forEach(turno => {
          this.turnosEspecialistas.forEach(element => {
            if(turno.idEspecialista == element.especialista.id &&  turno.estado == 'finalizado')
            {
              element.turnos++;
            }
          });
        });
        this.crearGrafico();
      });
    }
    else
    {
      this.initSubscribe = this.turnos.traerTodos().subscribe(turnos => {
        this.turnosEspecialistas.forEach(element => {
          element.turnos=0
        })

        turnos.forEach(turno => {
          this.turnosEspecialistas.forEach(element => {
            if(turno.idEspecialista == element.especialista.id &&  turno.estado == 'finalizado')
            {
              element.turnos++;
            }
          });
        });
        this.crearGrafico();
      });
    }
  }

  MostrarTabla()
  {
    this.mostrarTabla = true;
    this.mostrarGrafico = false;
  }
  MostrarGrafico()
  {
    this.mostrarTabla = false;
    this.mostrarGrafico = true;
  }

  crearGrafico()
  {
    let especialistasNombre:any[] = [];
    let turnos:any[] = [];
    this.turnosEspecialistas.forEach(element => {
      especialistasNombre.push(element.especialista.apellido+', '+element.especialista.nombre);
      turnos.push(element.turnos);
    });

    this.chart = this.grafico.crearGraficoBarras(especialistasNombre, turnos, 'Turnos finalizados por especialista', 'Especialistas', 'Cantidad de turnos', 'turnos');
  }

  Descargar()
  {
    this.pdf.descargarPdf('turnosFinalizadosXespecialista.pdf', 'htmlData');
  }
}
