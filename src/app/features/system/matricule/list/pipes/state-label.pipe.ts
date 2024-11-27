import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateLabel',
  standalone: true
})
export class StateLabelPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0:
        return 'Pendiente';
      case 1:
        return 'Matriculado';
      case 3:
        return 'Retirado';
      default:
        return 'No asignado';
    }
  }

}
