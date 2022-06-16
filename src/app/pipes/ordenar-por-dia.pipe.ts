import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenarPorDia'
})
export class OrdenarPorDiaPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    console.log(value)
   return ordenarPorBurbuja(value);
   function ordenarPorBurbuja(arrayDesordenado: any[]): any {
      // Copia el array recibido
      let tempArray: any[] = arrayDesordenado;
      let volverAOrdenar: boolean = false
     // console.log(tempArray[1+1].puntos);
      // Recorre el array
      tempArray.forEach(function (valor, key) {
    
        if(tempArray[key + 1]){
    
          // Comprueba si el primero es mayor que el segundo y no esta en la última posición
          if (tempArray[key].fechaCreacion > tempArray[key + 1].fechaCreacion && tempArray.length - 1 != key) {
              // Intercambia la primera posición por la segunda
              let primerNum = tempArray[key]
              let segundoNum = tempArray[key + 1]
              tempArray[key] = segundoNum
              tempArray[key + 1] = primerNum
              // Si debe volver a ordenarlo
              volverAOrdenar = true
          }
        }
      })
      if (volverAOrdenar) {
        ordenarPorBurbuja(tempArray)
    }
    // Array ordenado
    return tempArray
    }
     
  }

}
