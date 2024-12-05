import { Pipe, PipeTransform } from '@angular/core';
import { halfPayments } from '../system/matricule/alumnos/model/alumnos.model';

@Pipe({
  name: 'labelHalf',
  standalone: true
})
export class LabelHalfPipe implements PipeTransform {

  transform(value: number): string {
    const payment = halfPayments.find(option => option.id === value);
    return payment ? payment.name : 'Método no encontrado';
  }

}
