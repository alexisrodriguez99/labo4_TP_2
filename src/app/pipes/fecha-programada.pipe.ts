import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaProgramada'
})
export class FechaProgramadaPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    let fecha = new Date(value);
    let dia    
    let mes
//alert(typeof fecha.getDate())
    if(fecha.getDate() >10){
      dia=fecha.getDate();
    }
    else{
      dia='0'+fecha.getDate();
    }

    if((fecha.getMonth()+1) >10){
      mes=(fecha.getMonth()+1);
    }
    else{
      mes='0'+(fecha.getMonth()+1);
    }
    return dia+'/'+mes+'/'+fecha.getFullYear();
    return null;
  }

}
