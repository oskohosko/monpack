import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grams',
  standalone: true
})
export class GramsPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return `${value * 1000}g`;
  }

}
