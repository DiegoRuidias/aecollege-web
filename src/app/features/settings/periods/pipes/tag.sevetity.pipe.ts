import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagSevetity',
  standalone: true
})
export class TagSevetityPipe implements PipeTransform {

  transform(value: number): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch (value) {
      case 0:
        return 'danger';
      case 1:
        return 'success';
      case 2:
        return 'warning';
      default:
        return 'info';
    }
  }

}
