import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelBlankUsers',
  standalone: true
})
export class LabelBlankUsersPipe implements PipeTransform {

  transform(value: string, fallback: string = 'No registra'): string {
    return value == null ? fallback : value;
  }

}
