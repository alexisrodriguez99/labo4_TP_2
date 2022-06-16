import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreUsuario'
})
export class NombreUsuarioPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let retorno:any;

    //console.log(value);
    //console.log(args[0])
    args[0].forEach((element:any) => {
      if(value == element.id)
      {
        retorno = element.apellido+', '+element.nombre;
      }
    });
    return retorno;
  }
  

}
