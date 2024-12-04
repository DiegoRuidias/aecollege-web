import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'state',
  standalone: true
})
export class StatePipe implements PipeTransform {

  transform(value: number): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch (value) {
      case 0:
        return 'success';
      case 1:
        return 'warning';
      case 2:
        return 'danger';
      case 3:
        return 'info';
      default:
        return 'info';
    }
  }

}
