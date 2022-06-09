import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaProgramada'
})
export class FechaProgramadaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
