import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameLabel',
  standalone: true
})
export class NameLabelPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const words = value.trim().split(/\s+/);
    const firstTwoWords = words.slice(0, 2).join(' ');

    return firstTwoWords;
  }

}
