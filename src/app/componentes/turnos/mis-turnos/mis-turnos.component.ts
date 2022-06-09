import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {
  mostrandoResenia!:boolean;
  turnoPaResenia!:Turno;
  constructor(public authSvc:AuthService) { }

  ngOnInit(): void {
  }
  dejarDeMostrarResenia(e:any)
  {
    this.mostrandoResenia = e;
  }

  turnoElegido(e:any)
  {
   // console.log('llega a turnoElegido');
    this.turnoPaResenia = e;
    this.mostrandoResenia = true;
  }
}
