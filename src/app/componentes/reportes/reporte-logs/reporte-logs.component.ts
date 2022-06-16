import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { LogsClinica } from 'src/app/clases/logsClinica';
import { FirestoreService } from '../../services/firestore.service';
import { GraficoService } from '../../services/grafico.service';
import { PdfService } from '../../services/pdf.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-reporte-logs',
  templateUrl: './reporte-logs.component.html',
  styleUrls: ['./reporte-logs.component.scss']
})
export class ReporteLogsComponent implements OnInit {
  chart:any;

  logIngresos:LogsClinica[] = [];
  listadoUsuarios:any[]=[];
  mostrarTabla:boolean = true;
  mostrarGrafico:boolean = true;
  @Output() cerrarTabla:EventEmitter<any> = new EventEmitter<any>();

  constructor(private firestore:FirestoreService, private users:UsersService,private pdf:PdfService, private grafico:GraficoService) { }

  ngOnInit(): void {
    this.listadoUsuarios = this.users.listadoUsuarios;
    this.firestore.obtenerTodos('logsClinica').subscribe(logsSnapshot=>{
      this.logIngresos = [];
      logsSnapshot.forEach((element:any)=>{
        let data = element.payload.doc.data();
        this.logIngresos.push({
          idUsuario:data.idUsuario,
          fecha:data.fecha,
          hora:data.hora,
          nombre:data.nombre,
          mail:data.mail,
          apellido:data.apellido
        })
      });
    });
  }

  // crearGrafico()
  // {
  //   let fechas:any[] = [];
  //   let cantidad:any[] = [];
  //   this.listadoDias.forEach(element => {
  //     fechas.push(element.fecha);
  //     cantidad.push(element.cant);
  //   });

  //   this.chart = this.grafico.crearGraficoBarras(fechas, cantidad, 'Turnos solicitados por fecha', 'Fechas', 'Cantidad de turnos', 'turnos');
  // }

  Descargar()
  {
    this.pdf.descargarPdf('turnosXdia.pdf', 'htmlData');
  }
  volver()
  {
    this.cerrarTabla.emit('');
  }
formatoHora(hora:any){

}
}
