import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoFecha'
})
export class FormatoFechaPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let fecha = new Date(value);
    return fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
  }

}
