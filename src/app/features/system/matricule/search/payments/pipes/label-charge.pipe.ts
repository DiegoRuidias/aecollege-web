import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelCharge',
  standalone: true
})
export class LabelChargePipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0:
        return 'Pagado';
      case 1:
        return 'Pendiente';
      case 2:
        return 'Vencido';
      case 3:
        return 'Programado';
      default:
        return 'No asignado';
    }
  }

}
