import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'periodoTag',
  standalone: true
})
export class PeriodoTagPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0:
        return 'Finalizado';
      case 1:
        return 'En curso';
      case 2:
        return "Próximo";
      default:
        return 'Unknown';
    }
  }

}
