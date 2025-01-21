import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'driverid',
  standalone: true
})
export class DriveridPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    return value.driver_id.toString();
  }

}
