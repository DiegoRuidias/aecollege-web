import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameLabel',
  standalone: true
})
export class NameLabelPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return ''; 
    const names = value.split(' ');  
    return names[0];
  }

}
