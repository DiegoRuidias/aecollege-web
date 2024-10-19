import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'permissionsLabel',
  standalone: true
})
export class PermissionsLabelPipe implements PipeTransform {

  private convert: { [key: string]: string } = {
    'EDIT': 'Editar',
    'CREATE': 'Crear',
    'VIEW': 'Ver',
    'DELETE': 'Eliminar'
  };

  transform(value: string): string {
    return this.convert[value] || value; // Devuelve el valor traducido o el original si no se encuentra
  }
}
