import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relation',
  standalone: true
})
export class RelationPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case "1":
        return 'Papá';
      case "2":
        return 'Mamá';
      case "3":
        return 'Apoderado';
      default:
        return 'No asignado';
    }
  }
}
