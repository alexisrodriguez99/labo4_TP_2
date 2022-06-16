import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoHora'
})
export class FormatoHoraPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
     let hora=value.split(":");
    let cambiarHora=Number(hora[0]);
    if(cambiarHora>13){
      return cambiarHora-12+':'+hora[1]+' PM';
    }
    else{
      return cambiarHora+':'+hora[1]+' AM';

    }
    //alert(hora[0])

    return null;
  }

}
