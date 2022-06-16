import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  reporteSeleccionado!:any;
  constructor() { }

  ngOnInit(): void {
  }

  verIngresos()
  {
    this.reporteSeleccionado = 'ingresos';
  }

  verTurnosEspecialidad()
  {
    this.reporteSeleccionado = 'turnosEspecialidad';
  }

  verTurnosDia()
  {
    this.reporteSeleccionado = 'turnosDia';
  }

  verTurnosSolicitados()
  {
    this.reporteSeleccionado = 'turnosSolicitados';
  }

  verTurnosFinalizados()
  {
    this.reporteSeleccionado = 'turnosFinalizados';
  }

  cerrarTabla(e:any)
  {
    this.reporteSeleccionado=e;
  }

}
