import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-ver-resenia',
  templateUrl: './ver-resenia.component.html',
  styleUrls: ['./ver-resenia.component.scss']
})
export class VerReseniaComponent implements OnInit {
  @Input() turno!:Turno;
  @Output() cerrar:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  volver()
  {
    this.cerrar.emit(false);
  }
}
