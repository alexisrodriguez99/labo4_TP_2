import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appEstadoTurno]'
})
export class EstadoTurnoDirective implements AfterViewInit{
  @Input() appEstadoTurno = ''; // El input tiene que tener el mismo nombre que el selector. Este es el color por defecto.

  constructor(private element: ElementRef) {
    //this.cambiarColor(this.appEstadoTurno);
  }
  ngAfterViewInit(){
    this.cambiarColor(this.appEstadoTurno);

  }
  cambiarColor(color : string){
    console.log(color)

    if(color=='pendiente'){
      this.element.nativeElement.style.backgroundColor='rgba(38, 41, 226, 0.589)';
    }
   else if(color=='aceptado'){
      this.element.nativeElement.style.backgroundColor='rgb(27, 216, 59,0.5)';
    }
    else if(color=='cancelado'){
      this.element.nativeElement.style.backgroundColor='rgba(248, 20, 20, 0.589)';
    }
    else if(color=='rechazado'){
      this.element.nativeElement.style.backgroundColor='rgba(190, 4, 4, 0.589)';
    }
    else if(color=='finalizado'){
      this.element.nativeElement.style.backgroundColor='green';
    }
  }

}
