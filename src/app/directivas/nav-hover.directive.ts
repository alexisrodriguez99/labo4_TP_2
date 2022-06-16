import { Directive, ElementRef, HostListener,Input } from '@angular/core';

@Directive({
  selector: '[appNavHover]'
})
export class NavHoverDirective {
@Input() appNavHover = ''; // El input tiene que tener el mismo nombre que el selector. Este es el color por defecto.

  constructor(private element : ElementRef) { 
    //console.info(element);
    //console.log(element.nativeElement);
   // element.nativeElement.style.backgroundColor="red";
   
  }

  cambiarColor(color : string){
    console.log("Color: ",color);
    if(color=='yellow'){
      this.element.nativeElement.style.backgroundColor='rgb(137, 148, 35)';

    }
    else if(color=="pink"){
      this.element.nativeElement.style.backgroundColor='rgb(107, 11, 102)';

    }
    else{
          this.element.nativeElement.style.backgroundColor=color;

    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.cambiarColor(this.appNavHover);
    
  }
  
   @HostListener('mouseleave') onMouseLeave() {
     this.cambiarColor("");
   }
}
